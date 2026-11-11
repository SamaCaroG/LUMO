import { useState } from 'react'
import {
  createBalancedDiagnostic,
  DIAGNOSTIC_CATEGORIES,
  scoreDiagnostic,
} from './diagnosticBank.js'
import { createDiagnosticId, saveDiagnostic } from './diagnosticsStore.js'

export default function DiagnosticTest({ grade, studentName }) {
  const [questions, setQuestions] = useState(() => createBalancedDiagnostic(grade))
  const [answers, setAnswers] = useState({})
  const [submissionId, setSubmissionId] = useState(createDiagnosticId)
  const [result, setResult] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const submitDiagnostic = async (event) => {
    event.preventDefault()
    if (questions.some((item) => answers[item.id] === undefined)) {
      setError('Responde todas las preguntas antes de enviar tu diagnóstico.')
      return
    }

    const scoredResult = scoreDiagnostic(questions, answers)
    setError('')
    setIsSaving(true)

    try {
      await saveDiagnostic(submissionId, {
        studentName: studentName.trim(),
        grade,
        gradeLabel: `${grade}°`,
        ...scoredResult,
      })
      setResult(scoredResult)
    } catch (saveError) {
      console.error('No se pudo guardar el diagnóstico en Firestore.', saveError)
      if (saveError.code === 'permission-denied') {
        setError('No se pudo enviar el diagnóstico. Verifica los permisos de Firestore e inténtalo de nuevo.')
      } else if (saveError.code === 'unauthenticated' || saveError.message === 'Debes iniciar sesión para enviar el diagnóstico.') {
        setError('Tu cuenta no está conectada a Firebase. Inicia sesión con tu cuenta institucional y vuelve a intentarlo.')
      } else {
        setError('No pudimos guardar tu resultado. Revisa tu conexión e inténtalo de nuevo.')
      }
    } finally {
      setIsSaving(false)
    }
  }

  const restartDiagnostic = () => {
    setQuestions(createBalancedDiagnostic(grade))
    setAnswers({})
    setSubmissionId(createDiagnosticId())
    setResult(null)
    setError('')
  }

  if (result) {
    return (
      <section className="diagnostic-card diagnostic-result" aria-live="polite">
        <span className="diagnostic-eyebrow">Diagnóstico guardado</span>
        <h2>¡Terminaste, {studentName}!</h2>
        <p className="diagnostic-total-score">
          {result.totalCorrect} de {result.totalQuestions} respuestas correctas · {result.scorePercentage}%
        </p>
        <div className="diagnostic-score-grid">
          {DIAGNOSTIC_CATEGORIES.map((category) => {
            const area = result.areas[category.id]
            return (
              <article key={category.id} className="diagnostic-score-card">
                <strong>{category.label}</strong>
                <span>{area.correct}/{area.total} · {area.percentage}%</span>
              </article>
            )
          })}
        </div>
        <p className="diagnostic-result-note">
          Tu docente podrá revisar estos resultados y preparar actividades para seguir aprendiendo.
        </p>
        <button type="button" className="diagnostic-primary-button" onClick={restartDiagnostic}>
          Hacer otro diagnóstico
        </button>
      </section>
    )
  }

  return (
    <form className="diagnostic-card diagnostic-test" onSubmit={submitDiagnostic}>
      <div className="diagnostic-intro">
        <span className="diagnostic-intro-icon" aria-hidden="true">🎨</span>
        <div className="diagnostic-intro-copy">
          <span className="diagnostic-eyebrow">Diagnóstico artístico</span>
          <h2>Descubre lo que ya sabes de arte</h2>
          <p>
            Responde 8 preguntas sobre expresión artística, dibujo, color, forma y patrimonio
            cultural colombiano. Tu docente recibirá tus respuestas.
          </p>
        </div>
        <span className="diagnostic-grade-badge">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" /> Grado {grade}°
        </span>
      </div>

      <div className="diagnostic-question-list">
        {questions.map((item, index) => {
          const category = DIAGNOSTIC_CATEGORIES.find((area) => area.id === item.categoryId)
          return (
            <fieldset key={item.id} className={`diagnostic-question diagnostic-question-${index % 4}`}>
              <legend>
                <span className="diagnostic-question-number">{index + 1}</span>
                <span>
                  <small>{category.label} · {item.topic}</small>
                  {item.prompt}
                </span>
              </legend>
              <div className="diagnostic-options">
                {item.options.map((option, optionIndex) => (
                  <label key={option} className={Number(answers[item.id]) === optionIndex ? 'is-checked' : ''}>
                    <input
                      type="radio"
                      name={item.id}
                      value={optionIndex}
                      checked={Number(answers[item.id]) === optionIndex}
                      onChange={() => setAnswers((current) => ({ ...current, [item.id]: optionIndex }))}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )
        })}
      </div>

      {error && <p className="diagnostic-error" role="alert">{error}</p>}
      <button
        type="submit"
        className="diagnostic-primary-button"
        disabled={isSaving || Object.keys(answers).length !== questions.length}
      >
        {isSaving ? 'Guardando resultado…' : 'Enviar mi diagnóstico'}
      </button>
    </form>
  )
}
