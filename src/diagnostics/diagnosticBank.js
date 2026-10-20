export const DIAGNOSTIC_CATEGORIES = [
  { id: 'A', label: 'Elementos básicos y geometría' },
  { id: 'B', label: 'Teoría del color' },
  { id: 'C', label: 'Relaciones espaciales y técnicas' },
  { id: 'D', label: 'Patrimonio cultural colombiano' },
]

const question = (
  id,
  categoryId,
  topic,
  prompt,
  options,
  answerIndex,
  readingTitle,
  videoTitle,
  drawingActivity,
) => ({
  id,
  categoryId,
  topic,
  prompt,
  options,
  answerIndex,
  readingTitle,
  videoTitle,
  drawingActivity,
})

const questionBank = {
  1: [
    question('g1-a1', 'A', 'Punto y línea', 'Cuando un punto se desplaza por el papel, ¿qué deja a su paso?', ['Una línea', 'Un volumen', 'Una mezcla de colores'], 0, "Cuento: 'Soy un Punto'", '2. Puntos y Líneas Divertidas', 'Dibuja un camino que empiece en un punto y use una línea recta, una curva y un zigzag.'),
    question('g1-a2', 'A', 'Figuras geométricas', '¿Qué figura tiene tres lados rectos?', ['Círculo', 'Triángulo', 'Óvalo'], 1, "Cuento: 'Soy un Punto'", '3. Dibujando Figuras Básicas', 'Construye un animal usando triángulos, círculos y cuadrados en el lienzo.'),
    question('g1-a3', 'A', 'Contorno', 'El contorno de una figura es...', ['La línea que marca su borde', 'El color que se mezcla', 'El espacio que queda detrás'], 0, "Cuento: 'Soy un Punto'", '3. Dibujando Figuras Básicas', 'Dibuja tres objetos y repasa con otro color la línea de su borde.'),
    question('g1-a4', 'A', 'Punto y textura', '¿Qué técnica forma una imagen usando muchos puntos pequeños?', ['Puntillismo', 'Collage de volúmenes', 'Perspectiva'], 0, "Cuento: 'Soy un Punto'", '2. Puntos y Líneas Divertidas', 'Crea una fruta en el lienzo rellenándola solo con puntos separados y juntos.'),
    question('g1-b1', 'B', 'Colores primarios', '¿Cuál grupo contiene los tres colores primarios que estudiaste?', ['Amarillo, azul y rojo', 'Verde, naranja y violeta', 'Negro, blanco y gris'], 0, 'Los Colores Primarios', '1. Colores Primarios para 1°', 'Haz tres zonas en el lienzo y crea una imagen usando amarillo, azul y rojo.'),
    question('g1-b2', 'B', 'Mezcla de colores', 'Al mezclar amarillo y azul, ¿qué color secundario aparece?', ['Violeta', 'Verde', 'Naranja'], 1, 'Los Colores Primarios', '1. Colores Primarios para 1°', 'Pinta dos formas amarillas y azules que se encuentren para representar el verde.'),
    question('g1-b3', 'B', 'Sensaciones del color', 'En el texto, ¿con qué sensación se relaciona un amarillo brillante?', ['Un día soleado', 'Una noche oscura', 'Una sombra fría'], 0, 'Los Colores Primarios', '1. Colores Primarios para 1°', 'Dibuja un día soleado y elige colores que ayuden a mostrar cómo se siente.'),
    question('g1-b4', 'B', 'Mezcla de colores', '¿Qué mezcla produce naranja?', ['Azul y rojo', 'Amarillo y rojo', 'Amarillo y azul'], 1, 'Los Colores Primarios', '1. Colores Primarios para 1°', 'Crea una escena con amarillo y rojo y agrega el naranja que aparece al mezclarlos.'),
    question('g1-c1', 'C', 'Relaciones espaciales', 'En un dibujo, un objeto que está adelante suele verse...', ['Más cerca que uno del fondo', 'Siempre más pequeño', 'Fuera del papel'], 0, 'Carnaval de Negros y Blancos', '3. Dibujando Figuras Básicas', 'Dibuja una calle con un objeto grande adelante y casas más pequeñas al fondo.'),
    question('g1-c2', 'C', 'Herramientas de dibujo', '¿Qué herramienta ayuda a trazar una línea recta?', ['Regla', 'Pincel redondo', 'Borrador'], 0, "Cuento: 'Soy un Punto'", '2. Puntos y Líneas Divertidas', 'En el lienzo, combina una línea recta hecha con regla y líneas libres imaginadas.'),
    question('g1-c3', 'C', 'Figuras y contornos', 'Si quieres dibujar el borde de una tapa circular, ¿qué forma observas?', ['Triángulo', 'Círculo', 'Rectángulo'], 1, "Cuento: 'Soy un Punto'", '3. Dibujando Figuras Básicas', 'Observa un objeto redondo y dibuja su contorno como círculo en el lienzo.'),
    question('g1-c4', 'C', 'Composición', '¿Qué ayuda a que dos objetos no queden exactamente en el mismo lugar del dibujo?', ['Organizar su posición en el espacio', 'Pintarlos del mismo color', 'Borrar sus contornos'], 0, 'Carnaval de Negros y Blancos', '3. Dibujando Figuras Básicas', 'Organiza tres figuras en el lienzo: una adelante, otra al centro y otra atrás.'),
    question('g1-d1', 'D', 'Carnaval de Negros y Blancos · Pasto', '¿En qué ciudad se celebra el Carnaval de Negros y Blancos?', ['Pasto', 'Cartagena', 'Santa Marta'], 0, 'Carnaval de Negros y Blancos', '3. Dibujando Figuras Básicas', 'Diseña una carroza colorida inspirada en el carnaval y escribe qué historia cuenta.'),
    question('g1-d2', 'D', 'Carnaval de Negros y Blancos · carrozas', 'Según la lectura, ¿qué puede recorrer las calles durante el carnaval?', ['Carrozas con figuras grandes y coloridas', 'Murallas móviles de hielo', 'Círculos cromáticos gigantes'], 0, 'Carnaval de Negros y Blancos', '3. Dibujando Figuras Básicas', 'Dibuja una carroza con personajes y formas geométricas; agrega una nota sobre la tradición.'),
    question('g1-d3', 'D', 'Torbellino · región Cundiboyacense y Santander', '¿Qué ritmo regional propone explorar la actividad curricular de primer grado?', ['Torbellino', 'Mapalé', 'Bambuco del Pacífico'], 0, 'Carnaval de Negros y Blancos', '2. Puntos y Líneas Divertidas', 'Representa con líneas y colores el movimiento que imaginas al escuchar un torbellino.'),
    question('g1-d4', 'D', 'Patrimonio cultural', '¿Qué acción ayuda a cuidar una celebración tradicional?', ['Valorarla y conocer lo que representa para la comunidad', 'Cambiar su historia sin preguntar', 'Borrar sus símbolos'], 0, 'Carnaval de Negros y Blancos', '3. Dibujando Figuras Básicas', 'Crea una postal de una tradición que conozcas y escribe una manera de cuidarla.'),
  ],
  2: [
    question('g2-a1', 'A', 'Elementos visuales', '¿Cuál opción nombra elementos visuales estudiados en segundo grado?', ['Punto, línea, forma y volumen', 'Solo palabras y números', 'Únicamente sombras'], 0, 'Texturas Visuales y Puntillismo', '3. Composición con Formas', 'Combina punto, línea y formas geométricas para construir un objeto con apariencia de volumen.'),
    question('g2-a2', 'A', 'Textura visual', 'En el puntillismo, ¿qué puede sugerir la organización de los puntos?', ['Texturas y tonos', 'El peso real del papel', 'El sonido de una imagen'], 0, 'Texturas Visuales y Puntillismo', '1. Técnica del Puntillismo 2°', 'Crea dos superficies con puntos: una con puntos muy juntos y otra con puntos separados.'),
    question('g2-a3', 'A', 'Contorno y silueta', '¿Qué permite reconocer el contorno de un objeto?', ['La línea que delimita su forma', 'La mezcla de dos pinturas', 'La distancia entre dos páginas'], 0, 'Texturas Visuales y Puntillismo', '3. Composición con Formas', 'Dibuja una silueta y agrega dentro líneas y puntos para diferenciar sus partes.'),
    question('g2-a4', 'A', 'Volumen', '¿Qué recurso puede ayudar a que una forma parezca tener volumen?', ['Luces y sombras', 'Solo una línea abierta', 'Un título escrito debajo'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja una figura geométrica y añade una zona iluminada y otra en sombra.'),
    question('g2-b1', 'B', 'Colores secundarios', '¿Qué mezcla produce verde?', ['Amarillo y azul', 'Azul y rojo', 'Rojo y amarillo'], 0, 'Nacimiento de los Secundarios', '2. Mezcla de Colores Secundarios', 'En el lienzo, pinta una hoja con verde y muestra con dos manchas los colores que lo forman.'),
    question('g2-b2', 'B', 'Colores secundarios', '¿Qué mezcla produce violeta?', ['Amarillo y azul', 'Azul y rojo', 'Rojo y amarillo'], 1, 'Nacimiento de los Secundarios', '2. Mezcla de Colores Secundarios', 'Crea una flor violeta y representa a su lado la mezcla de colores que la origina.'),
    question('g2-b3', 'B', 'Colores secundarios', '¿Cuál es un color secundario?', ['Azul', 'Amarillo', 'Naranja'], 2, 'Nacimiento de los Secundarios', '2. Mezcla de Colores Secundarios', 'Diseña una composición donde destaquen verde, naranja y violeta.'),
    question('g2-b4', 'B', 'Sensaciones del color', 'Según la lectura de mezclas, ¿qué puede sugerir un naranja?', ['Calidez', 'Una regla geométrica', 'Una línea quebrada'], 0, 'Nacimiento de los Secundarios', '2. Mezcla de Colores Secundarios', 'Dibuja una escena cálida usando naranja y explica qué sensación quisiste transmitir.'),
    question('g2-c1', 'C', 'Planos visuales', 'En una escena con primer plano, plano medio y fondo, ¿qué organizan esos planos?', ['La profundidad visual', 'Las mezclas de colores', 'El contorno de una sola figura'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja una escena en tres planos y cambia el tamaño de los objetos para mostrar distancia.'),
    question('g2-c2', 'C', 'Relaciones espaciales', '¿Qué decisión ayuda a mostrar que un objeto está más lejos?', ['Ubicarlo hacia el fondo y representarlo más pequeño', 'Dibujarlo siempre en el centro', 'Ponerle un borde más grueso'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja un recorrido con un objeto cercano y otro lejano usando tamaño y ubicación.'),
    question('g2-c3', 'C', 'Regla y escuadra', '¿Qué instrumento permite trazar líneas rectas con precisión?', ['Regla', 'Hisopo', 'Esponja'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Usa líneas rectas en el lienzo para representar una fachada y añade detalles libres.'),
    question('g2-c4', 'C', 'Proporción', 'Al dibujar un edificio, ¿qué significa comparar la proporción de sus partes?', ['Observar cómo se relacionan sus tamaños', 'Mezclar todos sus colores', 'Contar cuántas líneas tiene'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja una fachada y compara el tamaño de sus puertas, ventanas y muros.'),
    question('g2-d1', 'D', 'Murallas de Cartagena · Caribe colombiano', '¿En qué ciudad colombiana se encuentran las murallas descritas en la lectura?', ['Cartagena de Indias', 'Pasto', 'Santa Fe de Antioquia'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja una parte de las murallas de Cartagena, destacando arcos, puertas o torres.'),
    question('g2-d2', 'D', 'Murallas de Cartagena · patrimonio', 'Además de su aspecto arquitectónico, ¿qué representan las murallas para la comunidad?', ['Parte de su memoria e historia', 'Una mezcla de colores primarios', 'Una herramienta para medir'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Crea una postal de Cartagena y añade una frase sobre cómo cuidar su patrimonio.'),
    question('g2-d3', 'D', 'Arquitectura patrimonial', '¿Cuál detalle arquitectónico se menciona en la lectura de Cartagena?', ['Arcos y torres', 'Tótems Tayrona', 'Carrozas del Carnaval de Pasto'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Dibuja una construcción patrimonial e incluye un arco o una torre que hayas observado.'),
    question('g2-d4', 'D', 'Cumbia y Mapalé · Litoral Atlántico', '¿Qué danzas del Litoral Atlántico aparecen en las actividades curriculares de segundo grado?', ['Cumbia y Mapalé', 'Torbellino y joropo', 'Bambuco y currulao'], 0, 'Las Murallas de Cartagena', '3. Composición con Formas', 'Representa una secuencia de movimiento de una danza del Litoral Atlántico con líneas y siluetas.'),
  ],
  3: [
    question('g3-a1', 'A', 'Simetría', 'Una figura tiene simetría cuando...', ['Sus partes guardan correspondencia a ambos lados de un eje', 'Todos sus lados son curvos', 'Sus colores son siempre primarios'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Dibuja una figura a ambos lados de un eje y agrega detalles propios sin perder la correspondencia.'),
    question('g3-a2', 'A', 'Proporción', '¿Qué observamos al comparar la proporción de dos elementos?', ['La relación entre sus tamaños', 'El nombre de sus colores', 'El material del lienzo'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Dibuja dos objetos de tamaños distintos y organiza sus proporciones en una escena.'),
    question('g3-a3', 'A', 'Formas y patrones', 'Al observar un diseño tradicional, ¿qué elemento visual puedes describir sin inventar su significado?', ['Sus formas y patrones visibles', 'Una historia que no conoces', 'La intención exacta de quien lo creó'], 0, 'Simbolismo Precolombino Tayrona', '3. Simbolismo Precolombino', 'Crea un patrón geométrico propio y explica solo las formas y repeticiones que observas.'),
    question('g3-a4', 'A', 'Figuras y contornos', '¿Qué herramienta permite trazar círculos de distintos radios con precisión?', ['Compás', 'Regla', 'Pincel'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Diseña una roseta de círculos y agrega formas libres alrededor en el lienzo.'),
    question('g3-b1', 'B', 'Colores cálidos', '¿Qué grupo se relaciona comúnmente con el sol o el fuego?', ['Rojo, naranja y amarillo', 'Azul, verde y violeta', 'Negro, gris y blanco'], 0, 'Temperatura del Color', '1. Colores Cálidos vs Fríos', 'Dibuja una tarde luminosa y usa una paleta cálida para crear su ambiente.'),
    question('g3-b2', 'B', 'Colores fríos', '¿Qué grupo suele asociarse con el agua, la vegetación o la noche?', ['Rojo, naranja y amarillo', 'Azul, verde y violeta', 'Amarillo, rojo y blanco'], 1, 'Temperatura del Color', '1. Colores Cálidos vs Fríos', 'Crea un paisaje tranquilo con colores fríos y destaca un elemento con contraste.'),
    question('g3-b3', 'B', 'Sensaciones del color', '¿Las asociaciones entre color y sensación son iguales para todas las personas?', ['Sí, siempre son reglas fijas', 'No, también influyen el contexto y la experiencia', 'Solo dependen del tamaño del papel'], 1, 'Temperatura del Color', '1. Colores Cálidos vs Fríos', 'Representa una misma escena con dos paletas distintas y compara las sensaciones.'),
    question('g3-b4', 'B', 'Contraste cromático', '¿Qué puede lograr combinar colores cálidos y fríos en una composición?', ['Crear contraste y destacar elementos', 'Convertir una figura en un instrumento', 'Eliminar las relaciones espaciales'], 0, 'Temperatura del Color', '1. Colores Cálidos vs Fríos', 'Crea una escena con zonas cálidas y frías y decide cuál elemento quieres destacar.'),
    question('g3-c1', 'C', 'Relaciones espaciales', 'En una escena dibujada, ¿qué organizan el primer plano, el plano medio y el fondo?', ['La ubicación visual y la sensación de profundidad', 'El orden de los colores primarios', 'La simetría de cada figura'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Dibuja un paisaje en tres planos y usa tamaños relativos para mostrar distancia.'),
    question('g3-c2', 'C', 'Regla y escuadra', '¿Qué instrumentos ayudan a construir líneas paralelas o perpendiculares?', ['Regla y escuadra', 'Compás únicamente', 'Lápices de color'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Construye una composición con líneas paralelas y perpendiculares y transforma su estructura.'),
    question('g3-c3', 'C', 'Compás', '¿Qué instrumento se usa para trazar círculos de distintos radios?', ['Compás', 'Escuadra', 'Borrador'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Traza una roseta con círculos de varios tamaños y añade color al diseño.'),
    question('g3-c4', 'C', 'Proporción', 'Si una parte de un objeto se dibuja demasiado grande frente a las demás, ¿qué relación se altera?', ['La proporción', 'La temperatura del color', 'El tipo de patrimonio'], 0, 'Simetría y Proporción', '2. Dibujo Simétrico y Proporcional', 'Dibuja un objeto cotidiano observando y comparando el tamaño de sus partes.'),
    question('g3-d1', 'D', 'Cultura Tayrona · Sierra Nevada de Santa Marta', '¿Con qué región se relacionan las comunidades asociadas a la cultura Tayrona descritas en el texto?', ['Sierra Nevada de Santa Marta', 'Desierto de la Tatacoa', 'Llanos Orientales'], 0, 'Simbolismo Precolombino Tayrona', '3. Simbolismo Precolombino', 'Dibuja una pieza inspirada en formas observadas y anota que su significado debe estudiarse con respeto.'),
    question('g3-d2', 'D', 'Patrimonio precolombino', 'Al observar un símbolo de una cultura indígena, ¿qué postura recomienda la lectura?', ['Respetar su contexto y no inventar su significado', 'Afirmar un significado sin investigar', 'Separarlo de la historia de su comunidad'], 0, 'Simbolismo Precolombino Tayrona', '3. Simbolismo Precolombino', 'Diseña un patrón propio y acompáñalo con una pregunta para investigar sobre su contexto cultural.'),
    question('g3-d3', 'D', 'Patrimonio cultural', '¿Qué puede ayudarnos a estudiar una pieza patrimonial sin atribuirle significados no comprobados?', ['Observar formas y materiales y consultar fuentes y voces pertinentes', 'Adivinar qué significa cada forma', 'Cambiar sus patrones para que parezcan conocidos'], 0, 'Simbolismo Precolombino Tayrona', '3. Simbolismo Precolombino', 'Haz un dibujo de observación de una pieza cultural y registra formas, materiales y preguntas.'),
    question('g3-d4', 'D', 'Diversidad cultural colombiana', '¿Por qué es valioso conocer el patrimonio precolombino?', ['Forma parte de la diversidad y memoria cultural del país', 'Porque todos los diseños tienen un significado idéntico', 'Porque reemplaza las culturas actuales'], 0, 'Simbolismo Precolombino Tayrona', '3. Simbolismo Precolombino', 'Crea una lámina que muestre cómo cuidar el patrimonio y respetar a las comunidades vinculadas.'),
  ],
}

function shuffle(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }
  return shuffled
}

export function createBalancedDiagnostic(grade, questionsPerCategory = 2) {
  const gradeQuestions = questionBank[grade]
  if (!gradeQuestions) throw new RangeError(`No hay banco diagnóstico para el grado ${grade}.`)
  if (!Number.isInteger(questionsPerCategory) || questionsPerCategory < 1) {
    throw new RangeError('La cantidad de preguntas por categoría debe ser un entero positivo.')
  }

  const selected = DIAGNOSTIC_CATEGORIES.flatMap((category) => {
    const categoryQuestions = gradeQuestions.filter((item) => item.categoryId === category.id)
    if (categoryQuestions.length < questionsPerCategory) {
      throw new Error(`El banco no tiene suficientes preguntas para ${category.label}.`)
    }
    return shuffle(categoryQuestions).slice(0, questionsPerCategory)
  })

  return shuffle(selected)
}

export function scoreDiagnostic(questions, answers) {
  const areas = Object.fromEntries(DIAGNOSTIC_CATEGORIES.map((category) => [
    category.id,
    { label: category.label, correct: 0, total: 0, percentage: 0 },
  ]))

  const answerDetails = questions.map((item) => {
    const isCorrect = Number(answers[item.id]) === item.answerIndex
    const area = areas[item.categoryId]
    area.total += 1
    if (isCorrect) area.correct += 1

    return {
      questionId: item.id,
      categoryId: item.categoryId,
      category: area.label,
      topic: item.topic,
      prompt: item.prompt,
      selectedAnswer: item.options[Number(answers[item.id])] ?? '',
      correctAnswer: item.options[item.answerIndex],
      isCorrect,
      readingTitle: item.readingTitle,
      videoTitle: item.videoTitle,
      drawingActivity: item.drawingActivity,
    }
  })

  Object.values(areas).forEach((area) => {
    area.percentage = area.total ? Math.round((area.correct / area.total) * 100) : 0
  })

  const totalCorrect = answerDetails.filter((item) => item.isCorrect).length
  const totalQuestions = questions.length

  return {
    areas,
    answers: answerDetails,
    failedAreas: answerDetails.filter((item) => !item.isCorrect).map((item) => ({
      categoryId: item.categoryId,
      category: item.category,
      topic: item.topic,
      prompt: item.prompt,
      readingTitle: item.readingTitle,
      videoTitle: item.videoTitle,
      drawingActivity: item.drawingActivity,
    })),
    totalCorrect,
    totalQuestions,
    scorePercentage: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
  }
}
