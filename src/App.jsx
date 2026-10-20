import { useEffect, useRef, useState } from 'react'
import './App.css'
import lumoColorLogo from '../Lumo logo (1).png'
import lumoLogoOnLight from '../fghneth.png'
import colSamShield from '../escudo colsam png.png'
import alanPhoto from '../Alan E.png'
import hectorPhoto from '../Hector B.png'
import juanPhoto from '../juan D.png'
import luzPhoto from '../luz d.png'
import samanthaPhoto from '../Samantha E.png'
import {
  curriculumDigitalPractices,
  curriculumGames,
} from './curriculumActivities.js'

const formatCompletionDate = (dateValue) => {
  const date = new Date(dateValue)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
}

const readingExampleLabels = [
  'Espacio reservado para una imagen de ejemplo',
  'Espacio reservado para otra imagen de ejemplo',
]

const gradeUiCopy = {
  1: {
    welcome: 'Elige tu curso y vamos a crear.',
    navSubtitles: ['Cuentos para descubrir', 'Videos para mirar', 'Juegos y retos', 'Dibuja a tu manera'],
    menuPrompt: 'Elige qué quieres explorar.',
    readingIntro: 'Lee estas historias y encuentra ideas para tus dibujos.',
    videoIntro: 'Elige un video para mirar y descubrir algo nuevo.',
    activityIntro: 'Busca un juego o un reto para dibujar.',
    activityPrompt: 'Elige un juego para compartir o un reto para dibujar en el lienzo.',
    gamesTitle: 'Juegos en grupo',
    gamesIntro: 'Juega con tus compañeros y descubre nuevas ideas.',
    unitLabel: 'Tema',
    allUnits: 'Todos los temas',
    materialsLabel: 'Necesitas:',
    readMore: 'Leer el texto',
    doneReading: '¡Listo!',
    periodLabel: 'Periodo',
    allPeriods: 'Todo el año',
    practiceCountUnit: 'retos de dibujo',
    practiceAction: '¡Vamos a dibujar!',
    viewSubmission: 'Ver mi dibujo',
    drawingTitle: '¡A dibujar!',
    drawingIntro: 'Mira la idea de la actividad y dibújala a tu manera.',
    canvasReady: '¡Tu lienzo está listo! Puedes empezar a dibujar.',
    clearCanvas: 'Borrar mi dibujo',
    saveCanvas: 'Guardar mi dibujo',
    submissionTitle: '¿Ya tienes tu dibujo?',
    submissionHelp: 'Elige una imagen o adjunta tu dibujo del lienzo. Después, pulsa «Entregar mi dibujo». Tu trabajo se guarda en esta página y no se envía a tu docente.',
    attachedLabel: 'Imagen lista en esta página',
    pending: 'Todavía no has adjuntado una imagen.',
    attached: 'Ya adjuntaste tu imagen. Pulsa «Entregar mi dibujo» para terminar.',
    confirmed: 'Dibujo entregado',
    chooseImage: 'Elegir mi dibujo',
    attachCanvas: 'Adjuntar mi dibujo',
    confirm: 'Entregar mi dibujo',
    update: 'Cambiar mi entrega',
  },
  2: {
    welcome: 'Elige tu curso y descubre nuevas ideas.',
    navSubtitles: ['Lecturas e historias', 'Videos para aprender', 'Juegos y retos', 'Crea en el lienzo'],
    menuPrompt: 'Elige una sección para comenzar.',
    readingIntro: 'Lee las historias y relaciona sus ideas con lo que sabes de arte.',
    videoIntro: 'Elige una videoclase para explorar técnicas y nuevas formas de crear.',
    activityIntro: 'Explora juegos y retos inspirados en los temas del curso.',
    activityPrompt: 'Elige un juego para practicar en grupo o un reto para crear una obra en el lienzo.',
    gamesTitle: 'Juegos para compartir',
    gamesIntro: 'Practica los temas del curso con tus compañeros.',
    unitLabel: 'Unidad',
    allUnits: 'Todas las unidades',
    materialsLabel: 'Materiales:',
    readMore: 'Leer el texto',
    doneReading: 'Entendido',
    periodLabel: 'Periodo',
    allPeriods: 'Todo el año',
    practiceCountUnit: 'retos',
    practiceAction: 'Abrir reto',
    viewSubmission: 'Ver entrega',
    drawingTitle: 'Crea en el lienzo',
    drawingIntro: 'Explora la consigna y encuentra una forma propia de representarla.',
    canvasReady: 'El lienzo está listo para que desarrolles tu idea.',
    clearCanvas: 'Limpiar mi dibujo',
    saveCanvas: 'Guardar mi obra',
    submissionTitle: 'Adjunta tu creación',
    submissionHelp: 'Sube una imagen de tu trabajo o adjunta tu dibujo del lienzo. Cuando esté listo, confirma la entrega. El archivo se conserva mientras esta página esté abierta y no se envía a un docente.',
    attachedLabel: 'Archivo adjunto en esta sesión',
    pending: 'Aún no has adjuntado una imagen.',
    attached: 'Tu imagen está adjunta. Confirma la entrega cuando quieras finalizar.',
    confirmed: 'Entrega confirmada',
    chooseImage: 'Elegir imagen',
    attachCanvas: 'Adjuntar dibujo del lienzo',
    confirm: 'Confirmar entrega',
    update: 'Actualizar entrega',
  },
  3: {
    welcome: 'Elige tu curso y explora las propuestas artísticas.',
    navSubtitles: ['Lecturas para inspirarte', 'Videos y técnicas', 'Juegos y desafíos', 'Diseña en el lienzo'],
    menuPrompt: 'Selecciona una sección para comenzar tu recorrido.',
    readingIntro: 'Explora las lecturas y conecta sus ideas con tus propias experiencias.',
    videoIntro: 'Selecciona una videoclase para observar técnicas y ampliar tus recursos.',
    activityIntro: 'Explora propuestas para poner a prueba tus ideas y decisiones artísticas.',
    activityPrompt: 'Elige un juego para intercambiar ideas o desarrolla un reto con una obra propia en el lienzo.',
    gamesTitle: 'Desafíos para compartir',
    gamesIntro: 'Pon en práctica los conceptos y conversa sobre las decisiones de cada equipo.',
    unitLabel: 'Unidad',
    allUnits: 'Todas las unidades',
    materialsLabel: 'Materiales:',
    readMore: 'Leer la lectura',
    doneReading: 'Cerrar lectura',
    periodLabel: 'Periodo',
    allPeriods: 'Todo el año',
    practiceCountUnit: 'propuestas',
    practiceAction: 'Desarrollar reto',
    viewSubmission: 'Revisar entrega',
    drawingTitle: 'Desarrolla tu propuesta',
    drawingIntro: 'Interpreta la consigna y desarrolla una propuesta visual con decisiones propias.',
    canvasReady: 'El lienzo está listo para que experimentes y desarrolles tu propuesta.',
    clearCanvas: 'Limpiar el lienzo',
    saveCanvas: 'Descargar mi obra',
    submissionTitle: 'Presenta tu creación',
    submissionHelp: 'Adjunta una imagen de tu obra o el dibujo del lienzo. Revísala y confirma la entrega para registrar la actividad. El archivo queda guardado solo mientras esta página esté abierta y no se envía a un docente.',
    attachedLabel: 'Archivo adjunto temporalmente en esta página',
    pending: 'No hay una imagen adjunta; la actividad sigue pendiente.',
    attached: 'La imagen está adjunta, pero la entrega sigue pendiente hasta que la confirmes.',
    confirmed: 'Obra entregada y confirmada',
    chooseImage: 'Adjuntar una imagen',
    attachCanvas: 'Adjuntar obra del lienzo',
    confirm: 'Confirmar entrega',
    update: 'Actualizar entrega',
  },
}

const curriculumData = {
  1: {
    title: '¡Manos, puntos, formas y colores!',
    desc: 'Actividades de arte para explorar materiales, dibujo, figuras y patrimonio cultural en primer grado.',
    textos: [
      {
        tag: 'Unidad 1',
        color: '#4BD166',
        title: "Cuento: 'Soy un Punto'",
        summary:
          'Un punto pequeño puede iniciar una gran aventura: al moverse deja una línea, y con muchas líneas pueden aparecer caminos, figuras y personajes.',
        fullText:
          '¡Hola! Soy un punto. Parezco pequeño, pero puedo ser el comienzo de un dibujo enorme. Cuando me quedo quieto, soy una marca; cuando salgo a pasear por el papel, dejo un camino detrás de mí.\n\nSi avanzo sin doblar, mi camino parece recto. Si me muevo despacito y cambio de dirección, puedo formar curvas, ondas o zigzags. A ese camino que dibujo lo llamamos línea. ¿Qué podría aparecer si mi línea se cerrara y volviera al lugar donde empezó?\n\nOtros puntos pueden reunirse conmigo. Algunos se acercan y forman grupos; otros se separan y dejan espacios. Si muchos puntitos de colores se juntan, pueden llenar una figura y crear una textura especial. Esa manera de dibujar se llama puntillismo.\n\nUn punto puede convertirse en una semilla, una estrella, una pelota o un personaje. Cada artista imagina algo distinto. Mira con atención: quizá encuentres puntos y líneas escondidos en las cosas que te rodean.',
      },
      {
        tag: 'Unidad 2',
        color: '#4BD166',
        title: 'Los Colores Primarios',
        summary:
          'El amarillo, el azul y el rojo son colores primarios. No se forman mezclando otros colores y nos ayudan a crear muchas combinaciones.',
        fullText:
          'En el mundo de los colores hay tres que llamamos primarios: amarillo, azul y rojo. Los encontramos en muchas partes: en una flor amarilla, en el cielo de un día despejado o en una fruta roja. Cada uno puede hacernos pensar en algo diferente.\n\nLos colores primarios son especiales porque no aparecen al mezclar otros colores. En cambio, al juntarlos de distintas maneras, podemos descubrir nuevos colores. Por ejemplo, el amarillo y el azul pueden formar verde; el rojo y el amarillo, naranja; y el azul con el rojo, violeta.\n\nLos colores también pueden ayudar a contar cómo se siente una escena. Un amarillo brillante puede recordar un día soleado; un azul puede parecer tranquilo como el agua; y un rojo puede llamar mucho la atención. No existe una sola manera de usarlos: cada artista decide qué quiere mostrar.\n\nCuando observes una imagen, busca el amarillo, el azul y el rojo. Después, piensa qué pasaría si esos colores se encontraran en una nueva creación.',
      },
      {
        tag: 'Patrimonio',
        color: '#4BD166',
        title: 'Carnaval de Negros y Blancos',
        summary:
          'En Pasto, el Carnaval de Negros y Blancos reúne música, disfraces, comparsas y carrozas para celebrar la cultura y la creatividad de la región.',
        fullText:
          'En la ciudad de Pasto, en el departamento de Nariño, se celebra cada año el Carnaval de Negros y Blancos. Durante la fiesta, las calles se llenan de música, bailes, disfraces y encuentros entre personas de distintos lugares.\n\nUno de sus momentos más llamativos son las carrozas. Artistas y comunidades preparan figuras grandes y coloridas que avanzan por las calles. Para imaginarlas, observan formas, crean personajes y trabajan con materiales como papel, cartón y otros elementos de construcción.\n\nEl carnaval también es una celebración de la identidad y de las tradiciones de la región. Los colores, las máscaras y las comparsas cuentan historias y muestran el talento de quienes participan. Cada creación puede tener detalles que las personas descubren al mirarla con atención.\n\nLas fiestas tradicionales forman parte del patrimonio cultural de un lugar. Conocerlas nos ayuda a valorar las diferentes maneras de celebrar y a cuidar las expresiones que las comunidades comparten.',
      },
    ],
    videos: [
      {
        id: '3v3H_3BOHL8',
        title: '1. Colores Primarios para 1°',
        desc: 'Aprende a identificar el Amarillo, Azul y Rojo en tu entorno.',
      },
      {
        id: '2B4_S2v1C0A',
        title: '2. Puntos y Líneas Divertidas',
        desc: 'Descubre cómo las líneas rectas y curvas forman objetos.',
      },
      {
        id: 'X4uUf9z8S2Y',
        title: '3. Dibujando Figuras Básicas',
        desc: 'Crea casas y soles con círculos y cuadrados.',
      },
    ],
  },
  2: {
    title: '¡Líneas, formas, volumen y color!',
    desc: 'Talleres para experimentar con elementos del dibujo, técnicas pictóricas y patrimonio cultural en segundo grado.',
    textos: [
      {
        tag: 'Unidad 1',
        color: '#4BD166',
        title: 'Nacimiento de los Secundarios',
        summary:
          'Al mezclar dos colores primarios aparecen los colores secundarios: verde, naranja y violeta. Cada mezcla deja ver cómo se relacionan los colores.',
        fullText:
          'Los colores primarios —amarillo, azul y rojo— pueden encontrarse en una mezcla y dar origen a otros colores. A los que nacen de combinar dos primarios los llamamos colores secundarios.\n\nCuando mezclamos amarillo con azul aparece el verde, como el de muchas hojas. Si unimos amarillo y rojo, obtenemos naranja, parecido al de algunas frutas. Y al combinar azul con rojo podemos crear violeta. La cantidad de cada color puede cambiar el resultado: a veces el tono queda más claro, más oscuro o se acerca más a uno de los colores de partida.\n\nEn una pintura, estos colores pueden ayudarnos a distinguir partes, crear contrastes o hacer que una zona llame la atención. También pueden sugerir cosas distintas: un verde puede recordar un jardín, un naranja puede sentirse cálido y un violeta puede darle misterio a una escena.\n\nObservar cómo cambian las mezclas es una forma de investigar. Los artistas prueban, comparan y eligen los tonos que mejor acompañan sus ideas.',
      },
      {
        tag: 'Unidad 2',
        color: '#4BD166',
        title: 'Texturas Visuales y Puntillismo',
        summary:
          'El puntillismo usa puntos para crear tonos y texturas visuales. Aunque la imagen esté plana, sus puntos pueden hacer que algunas zonas parezcan suaves, rugosas o luminosas.',
        fullText:
          'Una textura es una característica que podemos notar al tocar algo o al observarlo. Una piedra puede parecer rugosa, una tela puede verse suave y una superficie brillante puede reflejar la luz. En un dibujo, también es posible crear la sensación de textura aunque el papel sea liso: por eso hablamos de textura visual.\n\nEl puntillismo es una técnica que construye imágenes con muchos puntos pequeños. En lugar de cubrir una zona con un solo trazo, el artista organiza los puntos, cambia su tamaño o deja más espacio entre ellos. Así puede sugerir luces, sombras, colores y superficies distintas.\n\nCuando varios puntos de diferentes colores están cerca, nuestros ojos los observan juntos y perciben una mezcla visual. Por eso, algunos artistas colocan puntos amarillos y azules próximos para que, al mirar desde cierta distancia, la zona pueda parecernos verdosa. El efecto también depende de los tonos y del espacio entre los puntos.\n\nAl acercarnos, vemos cada punto por separado; al alejarnos, aparece la imagen completa. Esta técnica invita a mirar de cerca y de lejos para descubrir cómo se construye una obra.',
      },
      {
        tag: 'Patrimonio',
        color: '#4BD166',
        title: 'Las Murallas de Cartagena',
        summary:
          'Las murallas y fortificaciones de Cartagena forman parte de su paisaje histórico. Sus volúmenes, arcos y recorridos muestran cómo la arquitectura transforma un espacio.',
        fullText:
          'Cartagena de Indias es una ciudad del Caribe colombiano con una historia que puede leerse en sus calles y construcciones. Sus murallas y fortificaciones fueron levantadas hace siglos y hoy forman parte de un conjunto patrimonial muy reconocido.\n\nAl observar una muralla, podemos fijarnos en su extensión, en las superficies de piedra y en cómo sus partes ocupan el espacio. Los arcos, las entradas y las torres tienen formas y volúmenes que cambian según desde dónde los miremos. La luz también modifica su apariencia: algunas zonas quedan iluminadas y otras, en sombra.\n\nLa arquitectura reúne decisiones sobre forma, material, proporción y uso. En el centro histórico de Cartagena también encontramos balcones, puertas, plazas y edificios que muestran diferentes momentos de su historia. Mirarlos con atención permite descubrir detalles que a simple vista podrían pasar inadvertidos.\n\nEl patrimonio no es solo un edificio antiguo: también es parte de la memoria de una comunidad. Conocer estos lugares nos ayuda a valorar su historia y a pensar cómo podemos cuidarlos para quienes los visiten en el futuro.',
      },
    ],
    videos: [
      {
        id: 'pS9d3JCE3R0',
        title: '1. Técnica del Puntillismo 2°',
        desc: 'Crea paisajes con textura usando marcadores o hisopos.',
      },
      {
        id: '3v3H_3BOHL8',
        title: '2. Mezcla de Colores Secundarios',
        desc: 'Tutorial interactivo de combinación de pinturas.',
      },
      {
        id: 'X4uUf9z8S2Y',
        title: '3. Composición con Formas',
        desc: 'Ensambla figuras secundarias e ilustraciones complejas.',
      },
    ],
  },
  3: {
    title: '¡Espacio, color y técnicas!',
    desc: 'Explora la naturaleza, las relaciones espaciales, las mezclas de color y el dibujo con instrumentos en tercer grado.',
    textos: [
      {
        tag: 'Unidad 1',
        color: '#4BD166',
        title: 'Temperatura del Color',
        summary:
          'Los colores cálidos suelen asociarse con el sol o el fuego, y los fríos con el agua o la sombra. Estas relaciones pueden influir en el ambiente de una imagen.',
        fullText:
          'Algunos colores nos hacen pensar en sensaciones de calor y cercanía; otros pueden parecernos frescos o tranquilos. Por eso hablamos de colores cálidos y fríos. El rojo, el naranja y el amarillo suelen relacionarse con el fuego, el sol o una luz intensa. El azul, el verde y el violeta pueden recordarnos el agua, la vegetación o la noche.\n\nEstas asociaciones no son reglas que todas las personas sienten de la misma manera. El contexto influye: un azul muy brillante puede llamar la atención, mientras un rojo suave puede sentirse sereno. También importa qué colores lo acompañan, cuánto espacio ocupa y cuánta luz parece tener.\n\nEn una composición, la temperatura del color ayuda a construir un ambiente. Un paisaje con tonos cálidos puede sugerir una tarde luminosa; una escena con tonos fríos puede evocar sombra, distancia o calma. Al combinar ambos grupos, podemos crear contrastes y destacar ciertos elementos.\n\nObservar estas relaciones permite tomar decisiones visuales con intención. Preguntarnos qué sensación produce una paleta es una manera de comprender cómo el color participa en lo que una imagen comunica.',
      },
      {
        tag: 'Unidad 2',
        color: '#4BD166',
        title: 'Simetría y Proporción',
        summary:
          'La simetría organiza partes que se corresponden a ambos lados de un eje. La proporción compara tamaños y relaciones entre los elementos de una composición.',
        fullText:
          'La simetría aparece cuando las partes de una figura se corresponden de manera ordenada. Podemos imaginar un eje que la divide: en una figura simétrica, un lado guarda una relación parecida con el otro, como sucede en muchas hojas, mariposas y diseños.\n\nNo todas las simetrías son exactamente iguales ni tienen que aparecer solo en la naturaleza. En una obra, una persona puede repetir formas, líneas o colores a ambos lados para crear equilibrio. También puede cambiar algunos detalles y conservar una relación general entre las partes.\n\nLa proporción se refiere a cómo se comparan los tamaños de los elementos. Por ejemplo, podemos observar si una figura ocupa mucho espacio frente a otra, si una parte parece más grande o cómo se relacionan las formas dentro del conjunto. Cambiar esas relaciones puede modificar lo que percibimos: algo puede parecer cercano, importante, ligero o monumental.\n\nAl mirar una imagen, podemos buscar ejes, repeticiones y diferencias de tamaño. Estos elementos ayudan a entender cómo está organizada y qué decisiones tomó quien la creó.',
      },
      {
        tag: 'Patrimonio',
        color: '#4BD166',
        title: 'Simbolismo Precolombino Tayrona',
        summary:
          'Las piezas y diseños asociados a las culturas prehispánicas del territorio Tayrona reúnen formas, materiales y símbolos. Su interpretación requiere respeto por su historia y contexto.',
        fullText:
          'Antes de la llegada de los españoles, distintos pueblos habitaban el territorio que hoy conocemos como Colombia. En la región de la Sierra Nevada de Santa Marta vivieron comunidades asociadas a la cultura Tayrona, reconocidas por sus conocimientos, sus formas de organización y sus trabajos artesanales.\n\nEn objetos y piezas arqueológicas se observan formas, patrones y representaciones que se relacionan con su entorno y sus maneras de comprender el mundo. Los materiales, las repeticiones y las figuras permiten estudiar cómo se elaboraban algunos objetos y qué lugar podían tener en la vida de sus comunidades.\n\nEs importante acercarnos a estos símbolos con respeto. No siempre conocemos el significado exacto de cada diseño, y no conviene inventar una interpretación como si fuera un hecho. Los objetos tienen una historia y un contexto; por eso, aprender sobre ellos también implica escuchar las investigaciones y las voces de las comunidades indígenas actuales.\n\nEl patrimonio precolombino forma parte de la diversidad cultural del país. Observar sus formas puede despertar preguntas sobre las técnicas y los materiales, y ayudarnos a valorar la memoria de los pueblos que han habitado este territorio.',
      },
    ],
    videos: [
      {
        id: '3v3H_3BOHL8',
        title: '1. Colores Cálidos vs Fríos',
        desc: 'Aprende a transmitir emociones mediante la temperatura cromática.',
      },
      {
        id: '2B4_S2v1C0A',
        title: '2. Dibujo Simétrico y Proporcional',
        desc: 'Construye máscaras y elementos simétricos perfectos.',
      },
      {
        id: 'X4uUf9z8S2Y',
        title: '3. Simbolismo Precolombino',
        desc: 'Tutorial para recrear patrones ancestrales indígenas.',
      },
    ],
  },
}

// Preguntas predefinidas para el buscador asistido
const searchKnowledgeBase = {
  '¿Cuáles son los colores primarios?': 'Los colores primarios son el Amarillo, el Azul y el Rojo. Se llaman así porque son puros y no se pueden obtener mezclando otros colores.',
  '¿Qué es la técnica del puntillismo?': 'El puntillismo es una técnica artística en la que se crean imágenes usando miles de pequeños puntos de color en lugar de trazos largos o pinceladas continuas.',
  '¿Cómo combinar colores secundarios?': 'Los colores secundarios nacen al mezclar dos primarios: Amarillo + Azul = Verde; Azul + Rojo = Violeta; Rojo + Amarillo = Naranja.',
  '¿Qué son las figuras geométricas en el arte?': 'Todo en el mundo se puede descomponer en figuras básicas como círculos, triángulos y rectángulos para construir dibujos y estructuras fácilmente.'
}

const normalizeSearchText = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

function App() {
  const [currentGrade, setCurrentGrade] = useState(1)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [showAboutPage, setShowAboutPage] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const [activityUnit, setActivityUnit] = useState('all')
  const [digitalPeriod, setDigitalPeriod] = useState('all')
  const [digitalPracticeId, setDigitalPracticeId] = useState(curriculumDigitalPractices[1][0].id)
  const [drawingUploads, setDrawingUploads] = useState({})
  const [digitalCompletions, setDigitalCompletions] = useState({})
  const [uploadError, setUploadError] = useState('')
  const [tool, setTool] = useState('brush')
  const [shapeType, setShapeType] = useState('rectangle')
  const [toolSizes, setToolSizes] = useState({ brush: 8, pencil: 4, eraser: 18 })
  const [currentColor, setCurrentColor] = useState('#03658C')
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(curriculumData[1].videos[0])
  const [modalText, setModalText] = useState(null)

  // Estados para el Buscador Asistido
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [assistantAnswer, setAssistantAnswer] = useState(null)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const shapeStartRef = useRef(null)
  const shapeSnapshotRef = useRef(null)

  const data = curriculumData[currentGrade]
  const currentToolSize = toolSizes[tool] ?? toolSizes.brush
  const pageCopy = gradeUiCopy[currentGrade]
  const games = curriculumGames[currentGrade]
  const digitalPractices = curriculumDigitalPractices[currentGrade]
  const selectedDigitalPractice = digitalPractices.find((item) => item.id === digitalPracticeId) ?? digitalPractices[0]
  const selectedPracticeKey = `${currentGrade}-${selectedDigitalPractice.id}`
  const selectedUpload = drawingUploads[selectedPracticeKey]
  const selectedCompletion = digitalCompletions[selectedPracticeKey]
  const activityUnits = [...new Set([
    ...games.map((item) => item.unit),
    ...digitalPractices.map((item) => item.unit),
  ])]
  const visibleGames = activityUnit === 'all'
    ? games
    : games.filter((item) => item.unit === activityUnit)
  const visibleDigitalPractices = digitalPractices.filter((practice) => (
    (activityUnit === 'all' || practice.unit === activityUnit)
    && (digitalPeriod === 'all' || practice.period === Number(digitalPeriod))
  ))
  const normalizedSearchQuery = normalizeSearchText(searchQuery.trim())
  const matchesSearch = (...values) => !normalizedSearchQuery
    || normalizeSearchText(values.join(' ')).includes(normalizedSearchQuery)
  const filteredReadings = data.textos.filter((reading) => matchesSearch(
    reading.title, reading.tag, reading.summary, reading.fullText,
  ))
  const filteredVideos = data.videos.filter((video) => matchesSearch(video.title, video.desc))
  const filteredGames = visibleGames.filter((game) => matchesSearch(
    game.unit, game.title, game.goal, game.instructions, game.materials,
  ))
  const filteredDigitalPractices = visibleDigitalPractices.filter((practice) => matchesSearch(
    practice.unit, practice.topic, practice.title, practice.instructions,
  ))
  const drawingMatchesSearch = matchesSearch(
    selectedDigitalPractice.unit,
    selectedDigitalPractice.topic,
    selectedDigitalPractice.title,
    selectedDigitalPractice.instructions,
  )
  const sectionSearchOptions = activeTab === 'textos'
    ? filteredReadings.map((item, index) => ({ title: item.title, id: `reading-result-${index}` }))
    : activeTab === 'videos'
      ? filteredVideos.map((item, index) => ({ title: item.title, id: `video-result-${index}` }))
      : activeTab === 'actividades'
        ? [
            ...filteredGames.map((item, index) => ({ title: item.title, id: `game-result-${index}` })),
            ...filteredDigitalPractices.map((item, index) => ({ title: item.title, id: `practice-result-${index}` })),
          ]
        : activeTab === 'dibujos'
          ? drawingMatchesSearch ? [{ title: selectedDigitalPractice.title, id: 'drawing-workspace' }] : []
          : []

  const selectGrade = (grade) => {
    setCurrentGrade(grade)
    setActivityUnit('all')
    setDigitalPeriod('all')
    setSelectedVideo(curriculumData[grade].videos[0])
    setDigitalPracticeId(curriculumDigitalPractices[grade][0].id)
    setUploadError('')
  }

  const enterGrade = (grade) => {
    selectGrade(grade)
    setHasEnteredSite(true)
    setActiveTab(null)
  }

  const sectionLabels = {
    textos: 'Textos',
    videos: 'Videos',
    actividades: 'Actividades',
    dibujos: 'Dibujos',
  }

  useEffect(() => {
    if (activeTab !== 'dibujos') return

    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const safeWidth = Math.round(rect.width > 0 ? rect.width : 800)
      const safeHeight = Math.round(rect.height > 0 ? rect.height : 450)

      if (canvas.width !== safeWidth || canvas.height !== safeHeight) {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width || safeWidth
        tempCanvas.height = canvas.height || safeHeight
        const tempCtx = tempCanvas.getContext('2d')
        if (canvas.width && canvas.height) tempCtx.drawImage(canvas, 0, 0)

        canvas.width = safeWidth
        canvas.height = safeHeight
        if (tempCanvas.width && tempCanvas.height) {
          canvas.getContext('2d').drawImage(tempCanvas, 0, 0, safeWidth, safeHeight)
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [activeTab, currentGrade])

  useEffect(() => {
    const updateHeaderState = () => setHeaderScrolled(window.scrollY > 32)
    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  useEffect(() => {
    if (!modalText) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setModalText(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [modalText])

  const openReadingModal = (title, text) => {
    setModalText({ title, text })
  }

  const closeReadingModal = () => {
    setModalText(null)
  }

  // Manejo de Selección del Buscador Asistido
  const handleSelectQuestion = (question) => {
    setSearchQuery(question)
    setSearchOpen(false)
    setSearchSubmitted(false)
    const answer = searchKnowledgeBase[question] || '¡Qué gran pregunta sobre arte! Sigue explorando las secciones de Textos y Videos para descubrir más.'
    setAssistantAnswer({ title: question, text: answer })
  }

  const getCanvasPos = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  const startDrawing = (event) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getCanvasPos(event)
    if (tool === 'bucket') {
      fillCanvasAt(pos)
      return
    }
    if (tool === 'eyedropper') {
      const pixel = ctx.getImageData(Math.floor(pos.x), Math.floor(pos.y), 1, 1).data
      const sampledColor = pixel[3] > 0
        ? `#${[pixel[0], pixel[1], pixel[2]].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
        : '#FFFFFF'
      setCurrentColor(sampledColor.toUpperCase())
      return
    }

    isDrawingRef.current = true
    if (tool === 'shape') {
      shapeStartRef.current = pos
      shapeSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
      return
    }
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (event) => {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getCanvasPos(event)
    if (tool === 'shape') {
      const start = shapeStartRef.current
      const snapshot = shapeSnapshotRef.current
      if (!start || !snapshot) return
      ctx.putImageData(snapshot, 0, 0)
      drawShape(ctx, shapeType, start, pos)
      return
    }
    ctx.lineWidth = currentToolSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else if (tool === 'pencil') {
      ctx.strokeStyle = currentColor
      ctx.globalCompositeOperation = 'source-over'
    } else {
      ctx.strokeStyle = currentColor
      ctx.globalCompositeOperation = 'source-over'
    }

    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = (event) => {
    if (!isDrawingRef.current) return
    if (tool === 'shape' && event && shapeStartRef.current && shapeSnapshotRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.putImageData(shapeSnapshotRef.current, 0, 0)
      drawShape(ctx, shapeType, shapeStartRef.current, getCanvasPos(event))
    }
    isDrawingRef.current = false
    shapeStartRef.current = null
    shapeSnapshotRef.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const fillCanvasAt = ({ x, y }) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const startX = Math.floor(x)
    const startY = Math.floor(y)
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const { data: pixels, width, height } = image
    const startIndex = (startY * width + startX) * 4
    const target = [pixels[startIndex], pixels[startIndex + 1], pixels[startIndex + 2], pixels[startIndex + 3]]
    const fill = [0, 2, 4].map((offset) => Number.parseInt(currentColor.slice(offset + 1, offset + 3), 16))
    fill.push(255)
    if (target[3] > 0 && target.every((channel, index) => channel === fill[index])) return

    const matchesTarget = (pixelIndex) => {
      const alpha = pixels[pixelIndex + 3]
      if (target[3] <= 8) return alpha <= 8
      return Math.abs(alpha - target[3]) <= 24
        && Math.abs(pixels[pixelIndex] - target[0]) <= 32
        && Math.abs(pixels[pixelIndex + 1] - target[1]) <= 32
        && Math.abs(pixels[pixelIndex + 2] - target[2]) <= 32
    }
    const totalPixels = width * height
    const visited = new Uint8Array(totalPixels)
    const stack = new Int32Array(totalPixels)
    let stackLength = 0
    const startingPixel = startY * width + startX
    stack[stackLength++] = startingPixel
    visited[startingPixel] = 1

    while (stackLength > 0) {
      const pixel = stack[--stackLength]
      const pixelIndex = pixel * 4
      if (!matchesTarget(pixelIndex)) continue

      pixels[pixelIndex] = fill[0]
      pixels[pixelIndex + 1] = fill[1]
      pixels[pixelIndex + 2] = fill[2]
      pixels[pixelIndex + 3] = fill[3]
      const pixelX = pixel % width
      const neighbors = [
        pixelX > 0 ? pixel - 1 : -1,
        pixelX < width - 1 ? pixel + 1 : -1,
        pixel >= width ? pixel - width : -1,
        pixel < totalPixels - width ? pixel + width : -1,
      ]
      for (const neighbor of neighbors) {
        if (neighbor < 0 || visited[neighbor]) continue
        visited[neighbor] = 1
        stack[stackLength++] = neighbor
      }
    }

    ctx.putImageData(image, 0, 0)
  }

  const clearPracticeCompletion = (practiceKey) => {
    setDigitalCompletions((completions) => {
      if (!completions[practiceKey]) return completions
      const nextCompletions = { ...completions }
      delete nextCompletions[practiceKey]
      return nextCompletions
    })
  }

  const chooseDigitalPractice = (practice) => {
    setDigitalPracticeId(practice.id)
    setActivityUnit(practice.unit)
    setUploadError('')
    setActiveTab('dibujos')
  }

  const createArtworkDataUrl = () => {
    const drawingCanvas = canvasRef.current
    if (!drawingCanvas) return null

    const artworkCanvas = document.createElement('canvas')
    artworkCanvas.width = drawingCanvas.width
    artworkCanvas.height = drawingCanvas.height
    const ctx = artworkCanvas.getContext('2d')
    if (!ctx) return null

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, artworkCanvas.width, artworkCanvas.height)
    ctx.drawImage(drawingCanvas, 0, 0)
    return artworkCanvas.toDataURL('image/png')
  }

  const downloadCanvas = () => {
    const image = createArtworkDataUrl()
    if (!image) return
    const link = document.createElement('a')
    const username = document.getElementById('usernameInput')?.value || 'Artista'
    link.download = `LUMO_Grado${currentGrade}_${username}.png`
    link.href = image
    link.click()
  }

  const attachCanvasDrawing = () => {
    const drawingCanvas = canvasRef.current
    if (!drawingCanvas) {
      setUploadError('No se encontró el lienzo. Intenta abrir la actividad otra vez.')
      return
    }

    const drawingContext = drawingCanvas.getContext('2d')
    if (!drawingContext) {
      setUploadError('No se pudo revisar el lienzo. Intenta recargar la página.')
      return
    }

    try {
      const pixels = drawingContext.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height).data
      let hasArtwork = false
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) {
          hasArtwork = true
          break
        }
      }
      if (!hasArtwork) {
        setUploadError('El lienzo está vacío. Dibuja algo antes de adjuntarlo.')
        return
      }
    } catch (error) {
      console.error('No se pudo revisar el dibujo del lienzo.', error)
      setUploadError('No se pudo revisar el dibujo del lienzo. Intenta de nuevo.')
      return
    }

    const image = createArtworkDataUrl()
    if (!image) {
      setUploadError('No se pudo adjuntar el dibujo del lienzo. Intenta de nuevo.')
      return
    }
    setDrawingUploads((uploads) => ({
      ...uploads,
      [selectedPracticeKey]: {
        name: `LUMO_Grado${currentGrade}_${selectedDigitalPractice.title}.png`,
        dataUrl: image,
      },
    }))
    clearPracticeCompletion(selectedPracticeKey)
    setUploadError('')
  }

  const confirmDigitalPractice = () => {
    if (!selectedUpload?.name || !selectedUpload.dataUrl) {
      setUploadError('Adjunta una imagen o el dibujo del lienzo antes de confirmar la actividad.')
      return
    }

    setDigitalCompletions((completions) => ({
      ...completions,
      [selectedPracticeKey]: {
        completedAt: new Date().toISOString(),
        fileName: selectedUpload.name,
      },
    }))
    setUploadError('')
  }

  const handleDrawingUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setUploadError('Elige una imagen en formato PNG, JPG o WebP.')
      event.target.value = ''
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('La imagen debe pesar 8 MB o menos.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setUploadError('No se pudo leer la imagen. Intenta seleccionarla otra vez.')
        return
      }
      const previewImage = new Image()
      previewImage.onload = () => {
        setDrawingUploads((uploads) => ({
          ...uploads,
          [selectedPracticeKey]: { name: file.name, dataUrl: reader.result },
        }))
        clearPracticeCompletion(selectedPracticeKey)
        setUploadError('')
      }
      previewImage.onerror = () => {
        setUploadError('El archivo no contiene una imagen válida. Elige otra imagen.')
      }
      previewImage.src = reader.result
    }
    reader.onerror = () => {
      setUploadError('No se pudo leer la imagen. Intenta seleccionarla otra vez.')
    }
    reader.readAsDataURL(file)
  }

  const drawShape = (ctx, shape, start, end) => {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const width = Math.abs(dx)
    const height = Math.abs(dy)
    const left = Math.min(start.x, end.x)
    const top = Math.min(start.y, end.y)
    const centerX = left + width / 2
    const centerY = top + height / 2
    const side = Math.max(width, height)
    const squareLeft = dx < 0 ? start.x - side : start.x
    const squareTop = dy < 0 ? start.y - side : start.y

    ctx.strokeStyle = currentColor
    ctx.lineWidth = toolSizes.brush
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath()

    if (shape === 'line') {
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
    } else if (shape === 'rectangle') {
      ctx.rect(left, top, width, height)
    } else if (shape === 'square' || shape === 'circle') {
      if (shape === 'square') {
        ctx.rect(squareLeft, squareTop, side, side)
      } else {
        ctx.ellipse(squareLeft + side / 2, squareTop + side / 2, side / 2, side / 2, 0, 0, Math.PI * 2)
      }
    } else if (shape === 'oval') {
      ctx.ellipse(centerX, centerY, Math.max(width / 2, 1), Math.max(height / 2, 1), 0, 0, Math.PI * 2)
    } else if (shape === 'triangle') {
      ctx.moveTo(centerX, top)
      ctx.lineTo(left + width, top + height)
      ctx.lineTo(left, top + height)
      ctx.closePath()
    } else if (shape === 'diamond') {
      ctx.moveTo(centerX, top)
      ctx.lineTo(left + width, centerY)
      ctx.lineTo(centerX, top + height)
      ctx.lineTo(left, centerY)
      ctx.closePath()
    } else {
      const sides = shape === 'pentagon' ? 5 : shape === 'hexagon' ? 6 : 10
      for (let index = 0; index < sides; index += 1) {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / sides
        const pointScale = shape === 'star' && index % 2 === 1 ? 0.48 : 1
        const x = centerX + Math.cos(angle) * (width / 2) * pointScale
        const y = centerY + Math.sin(angle) * (height / 2) * pointScale
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
    }

    ctx.stroke()
  }

  return (
    <div className="lumo-app">
      <header className={`main-header ${headerScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <div
            className="brand"
            onClick={() => {
              setShowAboutPage(false)
              setHasEnteredSite(false)
              setActiveTab(null)
            }}
            role="button"
            tabIndex={0}
            aria-label="Volver a la selección de cursos"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setShowAboutPage(false)
                setHasEnteredSite(false)
                setActiveTab(null)
              }
            }}
          >
            <img className="brand-logo" src={lumoColorLogo} alt="LÜMØ, arte para aprender" />
          </div>

          {/* BUSCADOR ASISTIDO INTEGRADO */}
          <div className="search-container">
            <input
              type="text"
              className="search-box"
              id="searchInput"
              placeholder={activeTab ? `Buscar en ${sectionLabels[activeTab]}...` : 'Buscar...'}
              value={searchQuery}
              onClick={() => {
                setSearchOpen(true)
                setSearchSubmitted(true)
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchSubmitted(false)
                setSearchOpen(activeTab === null)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  setSearchSubmitted(true)
                  setSearchOpen(true)
                } else if (event.key === 'Escape') {
                  setSearchOpen(false)
                }
              }}
              aria-label={activeTab ? `Buscar en ${sectionLabels[activeTab]}` : 'Buscar'}
              aria-expanded={searchOpen}
              aria-controls="searchOptions"
            />
            <div className={`search-options ${searchOpen ? 'show' : ''}`} id="searchOptions">
              {activeTab === null ? (
                Object.keys(searchKnowledgeBase)
                  .filter((question) => matchesSearch(question))
                  .map((question) => (
                    <button
                      key={question}
                      type="button"
                      className="option-item"
                      onClick={() => handleSelectQuestion(question)}
                    >
                      {question.includes('color') ? '🎨 ' : question.includes('puntillismo') ? '🖌️ ' : question.includes('figuras') ? '📐 ' : '🌈 '}
                      {question}
                    </button>
                  ))
              ) : searchSubmitted ? (
                sectionSearchOptions.length ? sectionSearchOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="option-item"
                    onClick={() => {
                      setSearchOpen(false)
                      document.getElementById(option.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }}
                  >
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    {option.title}
                  </button>
                )) : (
                  <p className="search-options-empty">No se encontró contenido en {sectionLabels[activeTab]}.</p>
                )
              ) : null}
            </div>
          </div>

          <div className="profile-box">
            <input id="usernameInput" type="text" aria-label="Nombre del estudiante" defaultValue="Usuario" />
            <div className="profile-avatar">
              <i className="fa-solid fa-user" aria-hidden="true" />
            </div>
            <button
              type="button"
              className="school-link-button"
              onClick={() => setShowAboutPage(true)}
              aria-label="Ir a la página Nosotros"
              title="Ir a la página Nosotros"
            >
              <img src={colSamShield} alt="Escudo COLSAM" />
            </button>
          </div>
        </div>
      </header>

      <main className="main-shell">
        {showAboutPage ? (
          <NosotrosPage hideNavbar />
        ) : !hasEnteredSite ? (
          <section className="grade-lobby" aria-labelledby="grade-lobby-title">
            <div className="grade-lobby-heading">
              <h1 id="grade-lobby-title">¡BIENVENIDO!</h1>
              <p>{pageCopy.welcome}</p>
            </div>
            <div className="grade-card-grid">
              {[1, 2, 3].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  className={`grade-card grade-card-${grade}`}
                  onClick={() => enterGrade(grade)}
                  aria-label={`Entrar a ${grade === 1 ? 'primero, serie A' : grade === 2 ? 'segundo, serie B' : 'tercero, serie C'}`}
                >
                  <span className="grade-card-art" aria-hidden="true">
                    <span className="grade-card-digit">{grade}</span>
                    <span className="grade-card-eyes">
                      <span className="grade-card-eye"><span className="grade-card-pupil"><i /></span></span>
                      <span className="grade-card-eye"><span className="grade-card-pupil"><i /></span></span>
                    </span>
                    <span className="grade-card-stars" aria-hidden="true">
                      <i>✦</i><i>✧</i><i>✦</i><i>✧</i>
                    </span>
                  </span>
                  <span className="grade-card-caption">
                    <strong>{grade === 1 ? 'Primero' : grade === 2 ? 'Segundo' : 'Tercero'}</strong>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <>
        {/* BANNER DE RESPUESTA INTERACTIVA DEL ASISTENTE */}
        <div className={`assistant-response ${assistantAnswer ? 'show' : ''}`} id="assistantResponse">
          <button className="close-assistant" onClick={() => setAssistantAnswer(null)}>✕</button>
          <h3 id="responseTitle">
            <i className="fa-solid fa-wand-magic-sparkles" /> {assistantAnswer?.title}
          </h3>
          <p id="responseText">{assistantAnswer?.text}</p>
        </div>

        {activeTab === null ? (
          <section className="section-lobby">
            <div className="workspace-heading">
              <div className="workspace-heading-copy">
                <h1>¡MEJORA TUS HABILIDADES!</h1>
                <p>{data.desc}</p>
              </div>
            </div>

            <div className="nav-grid">
              {[
                { id: 'textos', label: 'TEXTOS', subtitle: pageCopy.navSubtitles[0], color: 'green', icon: 'fa-book-open' },
                { id: 'videos', label: 'VIDEOS', subtitle: pageCopy.navSubtitles[1], color: 'gold', icon: 'fa-play' },
                { id: 'actividades', label: 'ACTIVIDADES', subtitle: pageCopy.navSubtitles[2], color: 'crimson', icon: 'fa-pencil' },
                { id: 'dibujos', label: 'DIBUJOS', subtitle: pageCopy.navSubtitles[3], color: 'purple', icon: 'fa-paint-brush' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSearchOpen(false)
                    setSearchSubmitted(false)
                  }}
                  className={`nav-tab nav-${tab.color}`}
                >
                  <span className={`nav-card-title nav-${tab.color}`}>{tab.label}</span>
                  <span className="nav-card-content">
                    <span className={`tab-icon-wrap nav-icon-${tab.color}`}>
                      <i className={`fa-solid ${tab.icon}`} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="nav-card-subtitle">{tab.subtitle}</span>
                </button>
              ))}
            </div>

            <div className="menu-prompt">
              <i className="fa-solid fa-hand-pointer" aria-hidden="true" />
              <span>{pageCopy.menuPrompt}</span>
            </div>
          </section>
        ) : (
          <div className="content-page-heading">
            <button
              type="button"
              className="change-grade-button"
              onClick={() => {
                setActiveTab(null)
                setSearchOpen(false)
                setSearchSubmitted(false)
              }}
            >
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Volver al menú
            </button>
            <div>
              <h1 className={`section-heading-${activeTab}`}>{sectionLabels[activeTab]}</h1>
            </div>
          </div>
        )}

        <section className={`content-section reading-section ${activeTab === 'textos' ? '' : 'hidden'}`}>
          <div className="section-header">
            <div>
              <h2 className="section-title green"><i className="fa-solid fa-book-open" /> Lecturas e Historias</h2>
              <p>{pageCopy.readingIntro}</p>
            </div>
            <span className="section-badge green">Unidades de Grado {currentGrade}°</span>
          </div>
          <div className="card-grid">
            {filteredReadings.length ? filteredReadings.map((reading, index) => (
              <article key={reading.title} id={`reading-result-${index}`} className="reading-card">
                <div className="card-head">
                  <span className="mini-tag">{reading.tag}</span>
                  <span className="reading-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{reading.title}</h3>
                <p>{reading.summary}</p>
                <button type="button" className="primary-button" onClick={() => openReadingModal(reading.title, reading.fullText)}>
                  <span>{reading.title.startsWith('Cuento:') ? 'Leer el cuento' : pageCopy.readMore}</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </article>
            )) : <p className="search-empty-message">No se encontró contenido en Textos{searchQuery.trim() ? ` para «${searchQuery.trim()}»` : ''}.</p>}
          </div>
        </section>

        <section className={`content-section video-section ${activeTab === 'videos' ? '' : 'hidden'}`}>
          <div className="section-header">
            <div>
              <h2 className="section-title gold"><i className="fa-solid fa-circle-play" /> Video Tutoriales de Arte</h2>
              <p>{pageCopy.videoIntro}</p>
            </div>
            <span className="section-badge gold">Lecciones Grado {currentGrade}°</span>
          </div>

          <div className="video-card-grid">
            {filteredVideos.length ? filteredVideos.map((video, index) => {
              const isSelected = selectedVideo.id === video.id
              return (
                <article key={video.title} id={`video-result-${index}`} className={`video-card ${isSelected ? 'is-active' : ''}`}>
                  <div className="video-frame">
                    {isSelected ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className="video-card-preview"
                        onClick={() => setSelectedVideo(video)}
                        aria-label={`Reproducir ${video.title}`}
                      >
                        <span className="video-card-number">{index + 1}</span>
                        <i className="fa-solid fa-circle-play" aria-hidden="true" />
                        <span>Ver videoclase</span>
                      </button>
                    )}
                  </div>
                  <div className="video-meta">
                    <h3>{video.title}</h3>
                    <p>{video.desc}</p>
                  </div>
                </article>
              )
            }) : <p className="search-empty-message">No se encontró contenido en Videos{searchQuery.trim() ? ` para «${searchQuery.trim()}»` : ''}.</p>}
          </div>
        </section>

        <section className={`content-section activities-section ${activeTab === 'actividades' ? '' : 'hidden'}`}>
          <div className="section-header">
            <div>
              <h2 className="section-title crimson"><i className="fa-solid fa-list-check" /> Explora y crea</h2>
              <p>{pageCopy.activityIntro}</p>
            </div>
            <label className="activity-filter">
              <span>{pageCopy.unitLabel}</span>
              <select value={activityUnit} onChange={(event) => setActivityUnit(event.target.value)}>
                <option value="all">{pageCopy.allUnits}</option>
                {activityUnits.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </label>
          </div>

          <div className="activity-summary">
            <strong>{filteredDigitalPractices.length} {pageCopy.practiceCountUnit} · {filteredGames.length} juegos</strong>
            <p>{pageCopy.activityPrompt}</p>
          </div>

          {!filteredGames.length && !filteredDigitalPractices.length && (
            <p className="search-empty-message">No se encontró contenido en Actividades{searchQuery.trim() ? ` para «${searchQuery.trim()}»` : ''}.</p>
          )}

          {filteredGames.length > 0 && <div className="curriculum-game-section">
            <div className="curriculum-game-heading">
              <h3><i className="fa-solid fa-dice" aria-hidden="true" /> {pageCopy.gamesTitle}</h3>
              <p>{pageCopy.gamesIntro}</p>
            </div>
            <div className="curriculum-game-grid">
              {filteredGames.map((item, index) => (
                <article key={`${item.unit}-${item.title}`} id={`game-result-${index}`} className="curriculum-game-card">
                  <span className="activity-unit-tag">{item.unit}</span>
                  <h4>{item.title}</h4>
                  <p>{item.goal}</p>
                  <p className="curriculum-game-instructions">{item.instructions}</p>
                  <div className="activity-materials">
                    <i className="fa-solid fa-box-open" aria-hidden="true" />
                        <span><strong>{pageCopy.materialsLabel}</strong> {item.materials}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>}

          {filteredDigitalPractices.length > 0 && <div className="digital-practice-section">
            <div className="digital-practice-heading">
              <div>
                <h3><i className="fa-solid fa-paintbrush" aria-hidden="true" /> Retos creativos</h3>
              </div>
              <label className="digital-period-filter">
                <span>{pageCopy.periodLabel}</span>
                <select value={digitalPeriod} onChange={(event) => setDigitalPeriod(event.target.value)}>
                  <option value="all">{pageCopy.allPeriods}</option>
                  <option value="1">Periodo 1 · Unidades 1 y 2</option>
                  <option value="2">Periodo 2 · Unidad 3</option>
                  <option value="3">Periodo 3 · Unidad 4</option>
                </select>
              </label>
            </div>
            {[1, 2, 3].map((period) => {
              const periodPractices = filteredDigitalPractices.filter((practice) => practice.period === period)
              if (periodPractices.length === 0) return null

              return (
                <section key={period} className="digital-period-group">
                  <div className="digital-period-heading">
                    <h4>Periodo {period}</h4>
                    <span>{period === 1 ? 'Unidades 1 y 2' : `Unidad ${period === 2 ? 3 : 4}`} · {periodPractices.length} retos</span>
                  </div>
                  <div className="digital-practice-grid">
                    {periodPractices.map((practice) => {
                      const practiceKey = `${currentGrade}-${practice.id}`
                      const searchResultIndex = filteredDigitalPractices.indexOf(practice)
                      const completion = digitalCompletions[practiceKey]
                      const upload = drawingUploads[practiceKey]
                      return (
                        <article
                          key={practice.id}
                          id={`practice-result-${searchResultIndex}`}
                          className={`digital-practice-card ${selectedDigitalPractice.id === practice.id ? 'is-active' : ''}`}
                        >
                          <span className="activity-unit-tag">{practice.unit}</span>
                          <span className="digital-practice-topic">{practice.topic}</span>
                          <span className={`digital-practice-status ${completion ? 'is-complete' : ''}`}>
                            <i className={`fa-solid ${completion ? 'fa-circle-check' : upload ? 'fa-paperclip' : 'fa-clock'}`} aria-hidden="true" />
                            {completion
                              ? `Entrega confirmada · ${formatCompletionDate(completion.completedAt)}`
                              : upload
                                ? 'Adjunto listo · falta confirmar'
                                : 'Pendiente de entrega'}
                          </span>
                          <h4>{practice.title}</h4>
                          <p>{practice.instructions}</p>
                          <button
                            type="button"
                            className="practice-load-button"
                            aria-pressed={selectedDigitalPractice.id === practice.id}
                            onClick={() => chooseDigitalPractice(practice)}
                          >
                            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                            {completion ? pageCopy.viewSubmission : pageCopy.practiceAction}
                          </button>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
          }

        </section>

        <section className={`content-section drawings-section ${activeTab === 'dibujos' ? '' : 'hidden'}`}>
          <div className="section-header drawings-header">
            <div>
              <h2 className="section-title purple"><i className="fa-solid fa-palette" /> {pageCopy.drawingTitle}</h2>
              <p>{pageCopy.drawingIntro}</p>
            </div>
            <div className="canvas-actions">
              <button type="button" className="soft-button" onClick={clearCanvas}>
                <i className="fa-solid fa-eraser" /> {pageCopy.clearCanvas}
              </button>
              <button type="button" className="save-button" onClick={downloadCanvas}>
                <i className="fa-solid fa-download" /> {pageCopy.saveCanvas}
              </button>
            </div>
          </div>

          {drawingMatchesSearch ? (
            <>
          <div id="drawing-workspace" className="selected-practice-note">
            <strong>{selectedDigitalPractice.title}</strong>
            <span>{selectedDigitalPractice.instructions}</span>
            <span>{pageCopy.canvasReady}</span>
          </div>

          <div className="toolbar">
            <div className="tool-group">
              {[
                { id: 'brush', name: 'Pincel', icon: 'fa-paint-brush' },
                { id: 'pencil', name: 'Lápiz', icon: 'fa-pencil' },
                { id: 'eraser', name: 'Borrador', icon: 'fa-eraser' },
                { id: 'bucket', name: 'Cubeta de pintura', icon: 'fa-fill-drip' },
                { id: 'eyedropper', name: 'Gotero', icon: 'fa-eye-dropper' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`canvas-tool-btn ${tool === item.id ? 'is-selected' : ''}`}
                  onClick={() => setTool(item.id)}
                  title={item.name}
                  aria-label={item.name}
                  aria-pressed={tool === item.id}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="stamp-group">
              {[
                { id: 'line', label: 'Línea', path: 'M4 12 H20' },
                { id: 'rectangle', label: 'Rectángulo', path: 'M3.5 6 H20.5 V18 H3.5 Z' },
                { id: 'square', label: 'Cuadrado', path: 'M5 5 H19 V19 H5 Z' },
                { id: 'oval', label: 'Óvalo', path: 'M3 12 C3 7 7 4 12 4 C17 4 21 7 21 12 C21 17 17 20 12 20 C7 20 3 17 3 12 Z' },
                { id: 'circle', label: 'Círculo', path: 'M12 3 A9 9 0 1 1 12 21 A9 9 0 1 1 12 3 Z' },
                { id: 'triangle', label: 'Triángulo', path: 'M12 3 L22 20 H2 Z' },
                { id: 'diamond', label: 'Rombo', path: 'M12 2 L22 12 L12 22 L2 12 Z' },
                { id: 'pentagon', label: 'Pentágono', path: 'M12 2 L22 9 L18 21 H6 L2 9 Z' },
                { id: 'hexagon', label: 'Hexágono', path: 'M7 3 H17 L22 12 L17 21 H7 L2 12 Z' },
                { id: 'star', label: 'Estrella', path: 'M12 2 L14.9 8.7 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.7 Z' },
              ].map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  className={tool === 'shape' && shapeType === shape.id ? 'is-selected' : ''}
                  onClick={() => {
                    setShapeType(shape.id)
                    setTool('shape')
                  }}
                  title={shape.label}
                  aria-label={shape.label}
                  aria-pressed={tool === 'shape' && shapeType === shape.id}
                >
                  <svg className="shape-tool-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={shape.path} />
                  </svg>
                </button>
              ))}
            </div>

            <div className="size-group">
              <label htmlFor="drawing-stroke-size">Tamaño de {tool === 'pencil' ? 'lápiz' : tool === 'eraser' ? 'borrador' : 'pincel'}:</label>
              <input
                id="drawing-stroke-size"
                type="range"
                min="2"
                max="40"
                value={currentToolSize}
                disabled={!['brush', 'pencil', 'eraser', 'shape'].includes(tool)}
                onChange={(event) => {
                  const size = Number(event.target.value)
                  setToolSizes((sizes) => ({
                    ...sizes,
                    [tool === 'pencil' || tool === 'eraser' ? tool : 'brush']: size,
                  }))
                }}
                aria-label={`Tamaño de ${tool === 'pencil' ? 'lápiz' : tool === 'eraser' ? 'borrador' : 'pincel'}`}
              />
              <span className="size-number">{currentToolSize}</span>
            </div>

            <div className="palette-group">
              {[
                { color: '#000000', name: 'Negro' },
                { color: '#FFFFFF', name: 'Blanco' },
                { color: '#9B5A2E', name: 'Marrón' },
                { color: '#808080', name: 'Gris' },
                { color: '#E53935', name: 'Rojo' },
                { color: '#F57C00', name: 'Naranja' },
                { color: '#F0D53E', name: 'Amarillo' },
                { color: '#4BD166', name: 'Verde' },
                { color: '#00ACC1', name: 'Turquesa' },
                { color: '#03658C', name: 'Azul' },
                { color: '#8549BA', name: 'Violeta' },
                { color: '#EC407A', name: 'Rosado' },
              ].map(({ color, name }) => (
                <button
                  key={color}
                  type="button"
                  className={`palette-dot ${currentColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  aria-label={`Elegir color ${name}`}
                  aria-pressed={currentColor === color}
                />
              ))}
              <div className="custom-color-wrap">
                <button
                  type="button"
                  className="custom-color-button"
                  onClick={() => setColorPickerOpen((isOpen) => !isOpen)}
                  title="Elegir color personalizado"
                  aria-label="Elegir color personalizado"
                  aria-expanded={colorPickerOpen}
                >
                  <span className="rainbow-color-square" aria-hidden="true" />
                </button>
                {colorPickerOpen && (
                  <div className="color-picker-popover">
                    <label htmlFor="custom-drawing-color">Color personalizado</label>
                    <input
                      id="custom-drawing-color"
                      type="color"
                      value={currentColor}
                      onChange={(event) => setCurrentColor(event.target.value.toUpperCase())}
                      aria-label="Selecciona un color personalizado"
                    />
                    <button type="button" onClick={() => setColorPickerOpen(false)}>Listo</button>
                  </div>
                )}
              </div>
            </div>
            <span className="shape-size-hint">Para cambiar el ancho y el alto, elige una figura y arrástrala en el lienzo.</span>
          </div>

          <div className="canvas-shell">
            <canvas
              ref={canvasRef}
              id="paintCanvas"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
                startDrawing(event)
              }}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
            />
          </div>

          <section className="drawing-submission" aria-labelledby="drawing-submission-title">
            <div>
              <h3 id="drawing-submission-title">{pageCopy.submissionTitle}</h3>
              <p>{pageCopy.submissionHelp}</p>
              {selectedCompletion && (
                <p className="drawing-completion-confirmation" role="status">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  {pageCopy.confirmed}: {selectedCompletion.fileName} · {formatCompletionDate(selectedCompletion.completedAt)}.
                </p>
              )}
              {!selectedCompletion && (
                <p className={`drawing-submission-status ${selectedUpload ? 'is-ready' : ''}`} role="status">
                  <i className={`fa-solid ${selectedUpload ? 'fa-paperclip' : 'fa-clock'}`} aria-hidden="true" />
                  {selectedUpload
                    ? pageCopy.attached
                    : pageCopy.pending}
                </p>
              )}
            </div>
            <div className="drawing-upload-actions">
              <label className="upload-file-button">
                <i className="fa-solid fa-upload" aria-hidden="true" /> {pageCopy.chooseImage}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleDrawingUpload} />
              </label>
              <button type="button" className="template-button" onClick={attachCanvasDrawing}>
                <i className="fa-solid fa-palette" aria-hidden="true" /> {pageCopy.attachCanvas}
              </button>
            </div>
            {uploadError && <p className="drawing-upload-error" role="alert">{uploadError}</p>}
            {selectedUpload && (
              <div className="drawing-upload-preview">
                <img src={selectedUpload.dataUrl} alt={`Vista previa: ${selectedUpload.name}`} />
                <div>
                  <strong>{selectedUpload.name}</strong>
                  <span>{pageCopy.attachedLabel}</span>
                  <button
                    type="button"
                    className="remove-upload-button"
                    onClick={() => {
                      setDrawingUploads((uploads) => {
                        const nextUploads = { ...uploads }
                        delete nextUploads[selectedPracticeKey]
                        return nextUploads
                      })
                      clearPracticeCompletion(selectedPracticeKey)
                      setUploadError('')
                    }}
                  >
                    Quitar adjunto
                  </button>
                </div>
              </div>
            )}
            <button
              type="button"
              className="confirm-drawing-button"
              onClick={confirmDigitalPractice}
              disabled={!selectedUpload}
            >
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              {selectedCompletion ? pageCopy.update : pageCopy.confirm}
            </button>
          </section>
            </>
          ) : (
            <p className="search-empty-message">No se encontró contenido en Dibujos{searchQuery.trim() ? ` para «${searchQuery.trim()}»` : ''}.</p>
          )}
        </section>
        </>
        )}
      </main>

      {hasEnteredSite && <footer className="main-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img className="footer-logo" src={lumoLogoOnLight} alt="LÜMØ" />
            <span>— Arte Digital de 1° a 3° Grado de Primaria.</span>
          </div>
          <p>© 2026 LÜMØ Educativo. Arte, cultura y patrimonio para aprender en comunidad.</p>
        </div>
      </footer>}

      {modalText && (
        <div className="reading-modal" onClick={closeReadingModal}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="reading-modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-modal" aria-label="Cerrar lectura" onClick={closeReadingModal}>✕</button>
            <header className="reading-modal-header">
              <h3 id="reading-modal-title">{modalText.title}</h3>
            </header>
            <div className="reading-modal-content">
              <div className="reading-modal-text">
                {modalText.text.split('\n\n').map((paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
                ))}
              </div>
              <aside className="reading-example-spaces" aria-label="Espacios para futuras imágenes de ejemplo">
                {readingExampleLabels.map((label) => (
                  <div key={label} className="reading-example-placeholder">
                    <i className="fa-regular fa-image" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </aside>
            </div>
            <div className="modal-actions">
              <button type="button" className="primary-button small" onClick={closeReadingModal}>
                {pageCopy.doneReading}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

function NosotrosPage({ hideNavbar = false }) {
  const [activeTab, setActiveTab] = useState('nosotros')

  // Lista de estudiantes según requerimiento (Nombre + Inicial de Apellido)
  const equipoEstudiantes = [
    {
      nombre: "Héctor B.",
      rol: "Desarrollador Frontend",
      foto: hectorPhoto,
      color: "#9333ea",
    },
    {
      nombre: "Luz C.",
      rol: "Diseñadora UX/UI",
      foto: luzPhoto,
      color: "#eab308",
    },
    {
      nombre: "Juan D.",
      rol: "Desarrollador de Juegos",
      foto: juanPhoto,
      color: "#ec4899",
    },
    {
      nombre: "Alan E.",
      rol: "Especialista en QA & Multimedia",
      foto: alanPhoto,
      color: "#06b6d4",
    },
    {
      nombre: "Samantha E.",
      rol: "Coordinadora de Contenido",
      foto: samanthaPhoto,
      color: "#22c55e",
    }
  ];

  return (
    <div className="about-page">
      {/* Estilos CSS Integrados en el mismo archivo */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Comic Sans MS', 'Bubblegum Sans', system-ui, -apple-system, sans-serif;
        }

        body {
          background-color: #f4fbfd;
          color: #2c3e50;
        }

        .about-page {
          width: 100%;
          display: flex;
          flex-direction: column;
          background: transparent;
        }

        /* --- NAVBAR ESTILO LUMØ --- */
        .navbar {
          background-color: #0e7192;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: 1px;
          color: #ffffff;
          text-shadow: 2px 2px 0px #065570;
        }

        .logo-dot {
          color: #fbbf24;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          padding: 6px 16px;
          width: 320px;
          max-width: 100%;
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 14px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-icon {
          background: white;
          color: #0e7192;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-btn {
          background: transparent;
          border: 2px solid transparent;
          color: white;
          font-weight: 700;
          font-size: 15px;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .nav-btn.active {
          background: #ffffff;
          color: #0e7192;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          background: white;
          color: #0e7192;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        /* --- CONTENIDO PRINCIPAL --- */
        .main-container {
          flex: 1;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 32px 20px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 36px;
          color: #7e22ce;
          font-weight: 900;
          margin-bottom: 8px;
          text-shadow: 1px 1px 0px #e9d5ff;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 16px;
        }

        /* --- SECCIÓN NOSOTROS (ESTRUC. PEMSAM + ESTÉTICA LUMØ) --- */
        .grid-two {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .card {
          background: white;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
          border: 3px solid #f1f5f9;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .card-title {
          font-size: 24px;
          font-weight: 800;
          color: #0e7192;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-text {
          color: #475569;
          line-height: 1.6;
          font-size: 15px;
        }

        .illustration-box {
          background: #f0fdf4;
          border-radius: 18px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          margin-top: 16px;
          border: 2px dashed #86efac;
        }

        /* OBJETIVOS */
        .objectives-section {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 3px solid #e2e8f0;
          margin-bottom: 32px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }

        .obj-general {
          background: #0e7192;
          color: white;
          padding: 20px 24px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .obj-general h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
          margin-bottom: 6px;
        }

        .obj-general p {
          font-size: 18px;
          font-weight: 700;
        }

        .obj-specifics-title {
          font-size: 18px;
          color: #0e7192;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .obj-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .obj-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f8fafc;
          padding: 14px 18px;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
          font-size: 15px;
          color: #334155;
        }

        /* NUESTRO EQUIPO */
        .team-section {
          margin-bottom: 36px;
        }

        .section-heading {
          text-align: center;
          font-size: 28px;
          color: #0e7192;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .section-subheading {
          text-align: center;
          color: #64748b;
          margin-bottom: 28px;
          font-size: 14px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 20px;
        }

        .team-card {
          background: white;
          border-radius: 20px;
          padding: 20px 16px;
          text-align: center;
          border: 3px solid #f1f5f9;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s ease;
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.08);
        }

        .team-photo {
          width: 100px;
          height: 100px;
          display: grid;
          place-items: center;
          margin-bottom: 14px;
        }

        .team-photo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .member-name {
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .member-role {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .member-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.4;
        }

        /* TECNOLOGÍAS Y RECURSOS */
        .tech-resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .tech-box, .resource-box {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 3px solid #f1f5f9;
        }

        .badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .badge {
          background: #f1f5f9;
          color: #334155;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* FOOTER ESTILO LUMØ */
        .footer {
          background: #ffffff;
          border-top: 2px solid #e2e8f0;
          padding: 20px 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-size: 13px;
          color: #64748b;
        }

        .footer-logo {
          font-size: 20px;
          font-weight: 900;
          color: #0e7192;
        }

        /* HOME DUMMY VIEW */
        .home-view {
          text-align: center;
          padding: 40px 0;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 800px;
          margin: 30px auto;
        }

        .course-card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          border: 3px solid;
          font-weight: bold;
          font-size: 20px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.05);
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }
          .search-bar {
            width: 100%;
          }
          .courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ENCABEZADO / NAVBAR CON ACCESO A "NOSOTROS" */}
      {!hideNavbar && <nav className="navbar">
        <div className="logo-container" onClick={() => setActiveTab('inicio')}>
          <div className="logo-text">LÜMØ<span className="logo-dot">•</span></div>
        </div>

        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Buscar en LÜMØ..." />
          <div className="search-icon">🔍</div>
        </div>

        <div className="nav-actions">
          <button 
            className={`nav-btn ${activeTab === 'inicio' ? 'active' : ''}`}
            onClick={() => setActiveTab('inicio')}
          >
            🏠 Inicio
          </button>
          
          {/* Botón de acceso a "Nosotros" ubicado al lado de "Usuario" */}
          <button 
            className={`nav-btn ${activeTab === 'nosotros' ? 'active' : ''}`}
            onClick={() => setActiveTab('nosotros')}
          >
            👥 Nosotros
          </button>

          <div className="user-pill">
            <span>Usuario</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </nav>}

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-container">
        {activeTab === 'nosotros' ? (
          <div>
            <div className="page-header">
              <h1 className="page-title">¡CONOCE MÁS SOBRE NOSOTROS!</h1>
              <p className="page-subtitle">El proyecto detrás de la plataforma didáctica y artística LÜMØ</p>
            </div>

            {/* SECCIÓN: MISIÓN Y PROYECTO */}
            <div className="grid-two">
              <div className="card">
                <h3 className="card-title">🎯 Nuestra misión</h3>
                <p className="card-text">
                  Fomentar curiosidad y habilidades artísticas.
                  Evaluando proyectos de 1° a 3°.
                  Mediante exploración visual y digital.
                  Aplicando el arte a diario.
                  Durante este ciclo escolar actual.

                </p>
                <div className="illustration-box" style={{ background: '#fef3c7', borderColor: '#fde047' }}>
                  🎮 🎨 ✏️
                </div>
              </div>

              <div className="card">
                <h3 className="card-title">🧩 ¿Por qué existe LÜMØ?</h3>
                <p className="card-text">
                  Su núcleo pedagógico está alineado con los lineamientos curriculares de Educación Artística establecidos por el Ministerio de Educación Nacional de Colombia. El MEN estipula que la educación en estas edades no busca formar artistas técnicos, sino seres humanos integrales a través de tres dimensiones fundamentales.
                </p>
                <div className="illustration-box" style={{ background: '#e0f2fe', borderColor: '#bae6fd' }}>
                  🧩 💡 🌟
                </div>
              </div>
            </div>

            {/* SECCIÓN: OBJETIVOS */}
            <div className="objectives-section">
              <div className="card-title" style={{ marginBottom: '20px' }}>
                📌 SIGNIFICADO DE LÜMØ
              </div>
              
              <div className="obj-general">
                <h4>Objetivo General</h4>
                <p>FLÜM proviene del latín luz infinita.
                Los puntos en Ü son como ojitos.
                Los ojos representan la curiosidad infantil.
                La Ø es la marca de los programadores.
                LÜMØ une tecnología y uso infantil.
                Es luz creativa en un entorno digital.
</p>
              </div>

              <div className="obj-specifics-title">Objetivos específicos:</div>
              <ul className="obj-list">
                <li className="obj-item">
                  <span>🎨</span>
                  <span>Diseñar e implementar actividades interactivas en el aplicativo web que promuevan la exploración de formas y colores.</span>
                </li>
                <li className="obj-item">
                  <span>🖌️</span>
                  <span>Construir y aplicar ejercicios didácticos a través del lienzo digital para mejorar las habilidades perceptivas.</span>
                </li>
                <li className="obj-item">
                  <span>📊</span>
                  <span>Evaluar el desarrollo creativo e interactivad de los estudiantes mediante módulos didácticos adaptables.</span>
                </li>
              </ul>
            </div>

            {/* SECCIÓN: NUESTRO EQUIPO (ESTUDIANTES SOLICITADOS) */}
            <section className="team-section">
              <h2 className="section-heading">Nuestro equipo</h2>
              <p className="section-subheading">Estudiantes apasionados por la educación, el arte y la tecnología</p>

              <div className="team-grid">
                {equipoEstudiantes.map((estudiante, idx) => (
                  <div className="team-card" key={idx}>
                    <div className="team-photo">
                      <img src={estudiante.foto} alt={estudiante.nombre} />
                    </div>
                    <div className="member-name">{estudiante.nombre}</div>
                    <div className="member-role">{estudiante.rol}</div>
                    <div className="member-desc">Avatares hechos con CREAR TU AVATAR</div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECCIÓN: TECNOLOGÍAS Y RECURSOS */}
            <div className="tech-resources-grid">
              <div className="tech-box">
                <h3 className="card-title">💻 Tecnologías empleadas</h3>
                <p className="card-text">Lenguajes y herramientas para la estructuración y dinamismo del sitio:</p>
                <div className="badge-list">
                  <span className="badge">🌐 HTML5</span>
                  <span className="badge">🎨 CSS3 Puro</span>
                  <span className="badge">⚛️ React JS</span>
                  <span className="badge">⚡ JavaScript (ES6+)</span>
                </div>
              </div>

              <div className="resource-box">
                <h3 className="card-title">🛠️ Recursos usados</h3>
                <p className="card-text">Plataformas e instrumentos de apoyo pedagógico y visual:</p>
                <div className="badge-list">
                  <span className="badge">📦 GitHub</span>
                  <span className="badge">🚀 Vercel</span>
                  <span className="badge">🎨 Canva / Ilustración</span>
                  <span className="badge">📚 Contenido Pedagógico</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VISTA INICIAL DUMMY PARA MOSTRAR LA NAVEGACIÓN */
          <div className="home-view">
            <h1 className="page-title">¡BIENVENIDO A LÜMØ!</h1>
            <p className="page-subtitle">Elige tu curso y vamos a crear.</p>

            <div className="courses-grid">
              <div className="course-card" style={{ borderColor: '#9333ea', color: '#9333ea' }}>
                <div style={{ fontSize: '50px' }}>1️⃣</div>
                Primero
              </div>
              <div className="course-card" style={{ borderColor: '#eab308', color: '#ca8a04' }}>
                <div style={{ fontSize: '50px' }}>2️⃣</div>
                Segundo
              </div>
              <div className="course-card" style={{ borderColor: '#22c55e', color: '#16a34a' }}>
                <div style={{ fontSize: '50px' }}>3️⃣</div>
                Tercero
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PIE DE PÁGINA ESTILO LUMØ */}
      <footer className="footer">
        <div>
          <span className="footer-logo">LÜMØ</span> — Arte Digital e Interactividad Educativa.
        </div>
        <div>
          © 2026 LÜMØ Educativo. Arte, cultura y creatividad para aprender en comunidad.
        </div>
      </footer>
    </div>
  );
}