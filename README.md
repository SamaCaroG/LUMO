# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Acceso de prueba y diagnósticos

La pantalla de ingreso permite entrar con cualquier texto de correo que incluya `@` y una contraseña no vacía. Este acceso es únicamente de prueba: no verifica la contraseña ni crea una cuenta; abre una sesión local de estudiante y la guarda en el navegador actual. Los identificadores que incluyen `artesestudiante2` o `artesestudiante3` abren esos grados; los demás abren primero. No uses este modo para proteger información ni para cuentas reales.

El acceso local no comparte cuentas o sesiones entre navegadores. Para que las cuentas y contraseñas de tus amigos se verifiquen y funcionen en distintos dispositivos, hay que desplegar la aplicación en una dirección pública y configurar Firebase Authentication con usuarios reales.

Los resultados de diagnósticos usan Firebase Authentication y Cloud Firestore:

1. En Firebase Console, abre el proyecto `lumo-educativo`.
2. En **Authentication → Sign-in method**, activa **Correo electrónico/contraseña**.
3. En **Authentication → Users**, crea una cuenta por persona:
   - Estudiante: `nombre@artesestudiante1.lumo.invalid`, `nombre@artesestudiante2.lumo.invalid` o `nombre@artesestudiante3.lumo.invalid`, según su grado.
   - Docente: `nombre@artesplasticasdocente.lumo.invalid`.
   - En LÜMØ, se escribe el identificador sin `.lumo.invalid` (por ejemplo, `ana@artesestudiante1`) y la contraseña asignada a esa cuenta.
   - Los nombres de usuario solo pueden tener letras sin tildes; `ñ` se escribe `n`.
4. En **Firestore Database → Rules**, publica las reglas de `firestore.rules`. También puedes desplegarlas con Firebase CLI usando `firebase deploy --only firestore:rules`.
5. Inicia sesión con una cuenta de estudiante, envía el diagnóstico y, desde la cuenta docente, abre el grado y pulsa **Diagnóstico de grupo**.

> Nota de desarrollo: mientras no existan usuarios reales en Firebase, la app incluye un acceso temporal de prueba con estas cuentas demo y contraseña `LUMO123`: `luzdina@artesestudiante1`, `juan@artesestudiante1`, `samantha@artesestudiante2`, `maria@artesplasticasdocente`.

Las cuentas se crean en Firebase; la aplicación no permite que una persona se registre como docente. Las reglas permiten a estudiantes autenticados crear diagnósticos únicamente para el grado de su cuenta y a docentes autenticados leerlos. No habilites lectura o escritura pública.
