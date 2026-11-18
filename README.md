# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Acceso y diagnósticos

La pantalla de ingreso admite identificadores institucionales de estudiante (`nombre@artesestudiante1`, `nombre@artesestudiante2` o `nombre@artesestudiante3`) y docente (`nombre@artesplasticasdocente`). El tipo de identificador determina el apartado. Este acceso local requiere escribir correo y contraseña, pero no verifica la contraseña ni autentica con Firebase; la sesión se conserva en el navegador actual.

Para que las cuentas se validen en Firebase y los diagnósticos se compartan entre dispositivos en Cloud Firestore, configura Firebase Authentication y crea las cuentas:

1. En Firebase Console, abre el proyecto `lumo-educativo`.
2. En **Authentication → Sign-in method**, activa **Correo electrónico/contraseña**.
3. En **Authentication → Users**, crea una cuenta por persona:
   - Estudiante: `nombre@artesestudiante1.lumo.invalid`, `nombre@artesestudiante2.lumo.invalid` o `nombre@artesestudiante3.lumo.invalid`, según su grado.
   - Docente: `nombre@artesplasticasdocente.lumo.invalid`.
   - En LÜMØ, se escribe el identificador sin `.lumo.invalid` (por ejemplo, `ana@artesestudiante1`) y la contraseña asignada a esa cuenta.
   - Los nombres de usuario solo pueden tener letras sin tildes; `ñ` se escribe `n`.
4. En **Firestore Database → Rules**, publica las reglas de `firestore.rules`. También puedes desplegarlas con Firebase CLI usando `firebase deploy --only firestore:rules`.
5. Inicia sesión con una cuenta de Firebase de estudiante, envía el diagnóstico y, desde una cuenta docente, abre el grado y pulsa **Diagnóstico de grupo**. Allí se muestran el resultado grupal y las respuestas de cada estudiante.

Las cuentas se crean en Firebase; la aplicación no permite que una persona se registre como docente. Las reglas permiten a estudiantes autenticados crear diagnósticos únicamente para el grado de su cuenta y a docentes autenticados leerlos. No habilites lectura o escritura pública.
