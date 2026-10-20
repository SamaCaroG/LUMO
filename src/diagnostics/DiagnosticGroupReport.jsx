import { useEffect, useMemo, useState } from 'react'
import { DIAGNOSTIC_CATEGORIES } from './diagnosticBank.js'
import { subscribeToGradeDiagnostics } from './diagnosticsStore.js'

function getDateValue(value) {
  if (!value) return 0
  if (typeof value.toMillis === 'function') return value.toMillis()
  const parsed = new Date(value).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

function getAreaScore(result, categoryId) {
  const area = result.areas?.[categoryId]
  if (Number.isFinite(area?.percentage)) return area.percentage
  if (Number.isFinite(area?.correct) && Number.isFinite(area?.total) && area.total > 0) {
    return Math.round((area.correct / area.total) * 100)
  }
  return null
}

export default function DiagnosticGroupReport({
  grade,
  resources,
  onCreateActivity,
}) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedResource, setSelectedResource] = useState(null)

  useEffect(() => {
    return subscribeToGradeDiagnostics(
      grade,
      (gradeResults) => {
        setResults(gradeResults.sort((first, second) => getDateValue(second.createdAt) - getDateValue(first.createdAt)))
        setLoading(false)
      },
      (listenError) => {
        console.error(`No se pudieron cargar los diagnósticos del grado ${grade}.`, listenError)
        setError('No se pudieron cargar los resultados. Verifica la conexión y los permisos de Firestore.')
        setLoading(false)
      },
    )
  }, [grade])

  const report = useMemo(() => {
    const validResults = results.filter((item) => Number.isFinite(item.scorePercentage))
    const totalCorrect = validResults.reduce((total, item) => total + (Number(item.totalCorrect) || 0), 0)
    const totalQuestions = validResults.reduce((total, item) => total + (Number(item.totalQuestions) || 0), 0)
    const averageScore = totalQuestions
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0
    const categoryScores = DIAGNOSTIC_CATEGORIES.map((category) => {
      const scores = validResults
        .map((item) => getAreaScore(item, category.id))
        .filter((score) => score !== null)
      return {
        ...category,
        average: scores.length
          ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
          : null,
      }
    })
    const topics = new Map()

    validResults.forEach((item) => {
      ;(Array.isArray(item.failedAreas) ? item.failedAreas : []).forEach((failure) => {
        const topic = typeof failure.topic === 'string' ? failure.topic : ''
        if (!topic) return
        const key = `${failure.categoryId ?? 'A'}:${topic}`
        const current = topics.get(key) ?? {
          key,
          topic,
          category: failure.category || DIAGNOSTIC_CATEGORIES.find((area) => area.id === failure.categoryId)?.label || 'Área artística',
          count: 0,
          readingTitle: failure.readingTitle,
          videoTitle: failure.videoTitle,
          drawingActivity: failure.drawingActivity,
        }
        current.count += 1
        topics.set(key, current)
      })
    })

    return {
      students: validResults.length,
      averageScore,
      categoryScores,
      topics: [...topics.values()].sort((first, second) => second.count - first.count || first.topic.localeCompare(second.topic, 'es')),
    }
  }, [results])

  const findReading = (title) => resources.readings.find((item) => item.title === title)
  const findVideo = (title) => resources.videos.find((item) => item.title === title)

  if (loading) {
    return <div className="diagnostic-report-state" role="status">Cargando resultados del grado {grade}°…</div>
  }

  if (error) {
    return <div className="diagnostic-report-state diagnostic-error" role="alert">{error}</div>
  }

  if (!report.students) {
    return (
      <div className="diagnostic-report-state">
        <i className="fa-solid fa-chart-column" aria-hidden="true" />
        <h2>Diagnóstico de grupo · {grade}°</h2>
        <p>Aún no hay diagnósticos enviados para este grado. Los resultados aparecerán aquí al completar el test.</p>
      </div>
    )
  }

  return (
    <div className="diagnostic-report" aria-label={`Diagnóstico de grupo de ${grade}° grado`}>
      <header className="diagnostic-report-heading">
        <div>
          <span className="diagnostic-eyebrow">Grado {grade}°</span>
          <h2>📊 Diagnóstico de Grupo</h2>
        </div>
        <span>{report.students} {report.students === 1 ? 'envío' : 'envíos'}</span>
      </header>

      <section className="diagnostic-report-block">
        <h3>a) Resumen de Resultados</h3>
        <div className="diagnostic-summary-grid">
          <article className="diagnostic-summary-total">
            <span>Desempeño general</span>
            <strong>{report.averageScore}%</strong>
            <small>Promedio de respuestas correctas</small>
          </article>
          {report.categoryScores.map((category) => (
            <article key={category.id} className="diagnostic-category-metric">
              <span>{category.label}</span>
              <strong>{category.average === null ? '—' : `${category.average}%`}</strong>
              {category.average !== null && (
                <span className="diagnostic-meter" aria-label={`${category.average}% de desempeño`}>
                  <span style={{ width: `${category.average}%` }} />
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="diagnostic-report-block">
        <h3>b) Temas a Reforzar Detallados</h3>
        {report.topics.length ? (
          <ul className="diagnostic-topic-list">
            {report.topics.map((topic) => (
              <li key={topic.key}>
                <div>
                  <span>{topic.category}</span>
                  <strong>{topic.topic}</strong>
                </div>
                <span>{topic.count} {topic.count === 1 ? 'respuesta incorrecta' : 'respuestas incorrectas'}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="diagnostic-no-gaps">¡No se registraron respuestas incorrectas en este grupo!</p>
        )}
      </section>

      <section className="diagnostic-report-block">
        <h3>c) Recomendaciones de Acción en LÜMØ</h3>
        {report.topics.length ? (
          <div className="diagnostic-recommendations">
            {report.topics.map((topic) => {
              const reading = findReading(topic.readingTitle)
              const video = findVideo(topic.videoTitle)
              return (
                <article key={topic.key} className="diagnostic-recommendation">
                  <h4>{topic.topic}</h4>
                  <p>{topic.drawingActivity || 'Propón una creación breve en el lienzo para practicar este tema.'}</p>
                  <div className="diagnostic-resource-actions">
                    {reading && (
                      <button type="button" onClick={() => setSelectedResource({ type: 'reading', item: reading })}>
                        <i className="fa-solid fa-book-open" aria-hidden="true" /> Texto: {reading.title}
                      </button>
                    )}
                    {video && (
                      <button type="button" onClick={() => setSelectedResource({ type: 'video', item: video })}>
                        <i className="fa-solid fa-circle-play" aria-hidden="true" /> Video: {video.title}
                      </button>
                    )}
                    <button
                      type="button"
                      className="diagnostic-create-activity"
                      onClick={() => onCreateActivity({
                        title: `Refuerzo: ${topic.topic}`,
                        content: `${topic.drawingActivity || 'Practica este tema en el lienzo de dibujo de LÜMØ.'}\n\nPara estudiantes de ${grade}° grado.`,
                      })}
                    >
                      <i className="fa-solid fa-palette" aria-hidden="true" /> Crear actividad para el lienzo
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="diagnostic-no-gaps">El grupo puede avanzar a retos de profundización en textos, videos y lienzo.</p>
        )}
      </section>

      {selectedResource && (
        <div className="diagnostic-resource-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedResource(null)
        }}>
          <section className="diagnostic-resource-dialog" role="dialog" aria-modal="true" aria-labelledby="diagnostic-resource-title">
            <button type="button" className="diagnostic-resource-close" onClick={() => setSelectedResource(null)} aria-label="Cerrar recurso">×</button>
            <h3 id="diagnostic-resource-title">{selectedResource.item.title}</h3>
            {selectedResource.type === 'reading' ? (
              <div className="diagnostic-reading-preview">{selectedResource.item.fullText}</div>
            ) : (
              <>
                <p>{selectedResource.item.desc}</p>
                <div className="diagnostic-video-preview">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedResource.item.id}?autoplay=0`}
                    title={selectedResource.item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
