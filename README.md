# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Acceso, diagnósticos, actividades y entregas

La pantalla de ingreso admite identificadores institucionales de estudiante (`nombre@artesestudiante1`, `nombre@artesestudiante2` o `nombre@artesestudiante3`) y docente (`nombre@artesplasticasdocente`). El acceso se valida con Firebase Authentication (correo y contraseña); el tipo de identificador determina el apartado y el grado.

### Configuración en Firebase (proyecto `lumo-educativo-e8c75`)

1. En **Authentication → Sign-in method**, activa **Correo electrónico/contraseña**.
2. En **Authentication → Users**, crea una cuenta por persona:
   - Estudiante: `nombre@artesestudiante1.lumo.invalid`, `nombre@artesestudiante2.lumo.invalid` o `nombre@artesestudiante3.lumo.invalid`, según su grado.
   - Docente: `nombre@artesplasticasdocente.lumo.invalid`.
   - En LÜMØ se escribe el identificador sin `.lumo.invalid` (por ejemplo, `ana@artesestudiante1`).
   - Los nombres de usuario solo pueden tener letras minúsculas sin tildes; `ñ` se escribe `n`.
3. Crea la base en **Firestore Database** y, en **Rules**, publica el contenido de `firestore.rules`.
4. En **Authentication → Settings → Authorized domains**, agrega el dominio publicado (por ejemplo, `lumo-1.vercel.app`).

### Colecciones de Firestore

- `diagnosticos`: el estudiante guarda su diagnóstico; el docente lo lee en **Diagnóstico de grupo**.
- `actividades`: el docente publica actividades para un grado; los estudiantes de ese grado las ven en **Actividades**. El docente puede eliminarlas.
- `entregas`: dibujos que entregan los estudiantes; el docente los ve en el panel de su grado. Las imágenes se comprimen (alrededor de 700 KB como máximo) y se guardan dentro del documento, sin usar Firebase Storage.

En **Dibujos** el lienzo es libre (solo permite guardar la obra en el equipo). Para entregar un dibujo, el estudiante abre un reto o una actividad del docente; cada reto, actividad y el dibujo libre tienen su propio lienzo durante la sesión (al recargar la página se pierden los dibujos no entregados).

Las cuentas se crean en Firebase; la aplicación no permite registrarse como docente. Las reglas limitan cada acción por rol y grado. No habilites lectura o escritura pública.