# Reservamos Weather App

Este proyecto es una aplicación móvil que te permite consultar el clima actual. A continuación, te detallo los pasos para poder configurar y ejecutar el proyecto en tu máquina.

## Requisitos previos

- Tener instalada la última versión de **Node.js**. Puedes descargarla desde [aquí](https://nodejs.org/).

## Pasos para ejecutar el proyecto

1. **Descargar el proyecto**:
   
   Puedes descargar el proyecto de dos maneras:
   
   - **Desde el navegador**: Descargalo como un archivo ZIP y extrae el contenido.
   - **Desde la terminal (usando git)**: Ejecuta el siguiente comando en tu terminal para clonar el repositorio:
   
     ```bash
     git clone https://github.com/joseLuisMtzE/reservamos-weather-app
     ```
     Usa el siguiente comando para moverte al proyecto dentro del directorio.
       ```bash
     cd reservamos-weather-app
     ```

2. **Abrir el proyecto en un IDE**:
   
   Puedes abrir el proyecto con tu IDE favorito, pero si prefieres usar la terminal, navega al directorio del proyecto y abre Visual Studio Code con el siguiente comando:
   
   ```bash
   code .
3. **Instalar dependencias**
    Abre una terminal en el directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

    ```bash
    npm install
    ```

4. **Ejecutar el emulador de Android Studio**

    Asegúrate de tener Android Studio instalado y ejecuta un emulador Android desde el IDE.

5. **Iniciar el proyecto en el emulador**

    Una vez que el emulador esté en ejecución y las dependencias se hayan instalado, corre el siguiente comando para iniciar el proyecto:

    ```bash
    npx expo start --android
    ```
    Espera a que el proyecto se abra en el emulador Android
