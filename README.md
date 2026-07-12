# 🚗 Ride Hailing — Plataforma de Transporte

> Plataforma completa de transporte bajo demanda con aplicaciones para conductores, pasajeros y panel de administración.

---

## 📐 Arquitectura del Proyecto

Este repositorio es un **monorepo** que contiene todos los componentes de la plataforma:

```
ride_hailing/
├── apps/
│   ├── admin/        # Panel de administración (Next.js)
│   ├── driver/       # App del conductor (Flutter)
│   └── passenger/    # App del pasajero (Flutter)
└── backend/
    └── api/          # API REST + WebSockets (NestJS + PostgreSQL)
```

### Stack Tecnológico

| Componente | Tecnología |
|---|---|
| **Backend API** | NestJS · TypeScript · PostgreSQL · TypeORM |
| **Autenticación** | Firebase Auth |
| **Tiempo real** | WebSockets (Socket.io via NestJS Gateway) |
| **Panel Admin** | Next.js · TypeScript |
| **App Conductor** | Flutter (Android · iOS · Web) |
| **App Pasajero** | Flutter (Android · iOS · Web) |

---

## 🚀 Puesta en Marcha

### Requisitos

- Node.js >= 18
- Flutter >= 3.12
- PostgreSQL >= 14
- Proyecto de Firebase configurado

### 1. Backend (`backend/api`)

```bash
cd backend/api
npm install

# Configura las variables de entorno
cp .env.example .env

# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

Variables de entorno requeridas (`.env`):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=ride_hailing
FIREBASE_PROJECT_ID=your-project-id
```

### 2. Panel Admin (`apps/admin`)

```bash
cd apps/admin
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

### 3. App Conductor (`apps/driver`)

```bash
cd apps/driver
flutter pub get

# Correr en dispositivo/emulador
flutter run

# Build web
flutter build web
```

### 4. App Pasajero (`apps/passenger`)

```bash
cd apps/passenger
flutter pub get

# Correr en dispositivo/emulador
flutter run

# Build web
flutter build web
```

---

## 📋 Roadmap de Tareas

> Las siguientes tareas están organizadas por módulo y prioridad. Cada una puede convertirse en un **GitHub Issue** dentro del repositorio.

### 🔴 Alta Prioridad

#### Backend

- [ ] **[BACKEND-01]** Crear módulo de usuarios (`users`) con entidad, repositorio y CRUD básico
- [ ] **[BACKEND-02]** Crear módulo de viajes (`trips`) con estados: `pending`, `accepted`, `in_progress`, `completed`, `cancelled`
- [ ] **[BACKEND-03]** Implementar endpoint `POST /trips` para que pasajeros soliciten viajes
- [ ] **[BACKEND-04]** Implementar endpoint `PATCH /trips/:id/accept` para que conductores acepten viajes
- [ ] **[BACKEND-05]** Integrar WebSocket Gateway para emitir eventos en tiempo real (`trip.requested`, `trip.accepted`, `location.updated`)
- [ ] **[BACKEND-06]** Crear endpoint de actualización de ubicación del conductor (`PATCH /drivers/:id/location`)
- [ ] **[BACKEND-07]** Validar tokens de Firebase en cada request protegido (`FirebaseAuthGuard`)
- [ ] **[BACKEND-08]** Agregar variables de entorno de Firebase al módulo de configuración

#### App Pasajero

- [ ] **[PASSENGER-01]** Implementar pantalla de autenticación con Firebase (Google / Email)
- [ ] **[PASSENGER-02]** Implementar mapa principal con `google_maps_flutter` o `flutter_map`
- [ ] **[PASSENGER-03]** Implementar flujo de solicitud de viaje: selección de origen y destino
- [ ] **[PASSENGER-04]** Implementar pantalla de seguimiento del conductor en tiempo real
- [ ] **[PASSENGER-05]** Implementar pantalla de historial de viajes

#### App Conductor

- [ ] **[DRIVER-01]** Implementar pantalla de autenticación con Firebase
- [ ] **[DRIVER-02]** Implementar pantalla de disponibilidad (online/offline toggle)
- [ ] **[DRIVER-03]** Implementar notificación push y popup de solicitud de viaje entrante
- [ ] **[DRIVER-04]** Implementar envío de ubicación en tiempo real con `geolocator`
- [ ] **[DRIVER-05]** Implementar pantalla de navegación hacia el pasajero y al destino

#### Panel Admin

- [ ] **[ADMIN-01]** Implementar autenticación de administradores con Firebase
- [ ] **[ADMIN-02]** Implementar dashboard con métricas clave (viajes totales, conductores activos, ingresos)
- [ ] **[ADMIN-03]** Implementar tabla de gestión de usuarios (pasajeros y conductores)
- [ ] **[ADMIN-04]** Implementar tabla de gestión de viajes con filtros por estado y fecha

---

### 🟡 Media Prioridad

#### Backend

- [ ] **[BACKEND-09]** Implementar cálculo de tarifa estimada según distancia
- [ ] **[BACKEND-10]** Crear módulo de pagos con soporte para registro de transacciones
- [ ] **[BACKEND-11]** Implementar sistema de calificaciones (pasajero califica conductor y viceversa)
- [ ] **[BACKEND-12]** Agregar paginación a todos los endpoints de listado
- [ ] **[BACKEND-13]** Configurar migraciones de TypeORM (deshabilitar `synchronize: true` en producción)
- [ ] **[BACKEND-14]** Agregar logging estructurado con Winston o NestJS Logger

#### App Pasajero

- [ ] **[PASSENGER-06]** Implementar pantalla de calificación al finalizar el viaje
- [ ] **[PASSENGER-07]** Implementar pantalla de perfil del usuario
- [ ] **[PASSENGER-08]** Mostrar estimación de precio antes de confirmar el viaje

#### App Conductor

- [ ] **[DRIVER-06]** Implementar pantalla de calificación al finalizar el viaje
- [ ] **[DRIVER-07]** Implementar pantalla de ganancias del día/semana
- [ ] **[DRIVER-08]** Implementar pantalla de perfil del conductor con documentos

#### Panel Admin

- [ ] **[ADMIN-05]** Implementar mapa en tiempo real con ubicaciones de conductores activos
- [ ] **[ADMIN-06]** Implementar gestión de tarifas por zona o distancia
- [ ] **[ADMIN-07]** Implementar reportes exportables (CSV/PDF)

---

### 🟢 Baja Prioridad / Mejoras

- [ ] **[INFRA-01]** Configurar GitHub Actions para CI/CD (lint, tests, build)
- [ ] **[INFRA-02]** Dockerizar el backend con `Dockerfile` y `docker-compose.yml`
- [ ] **[INFRA-03]** Configurar despliegue automático del panel admin en Vercel o GitHub Pages
- [ ] **[INFRA-04]** Configurar despliegue automático de las apps Flutter Web en GitHub Pages
- [ ] **[INFRA-05]** Agregar tests unitarios al backend (Jest)
- [ ] **[INFRA-06]** Agregar tests de widgets al app de Flutter
- [ ] **[BACKEND-15]** Implementar rate limiting con `@nestjs/throttler`
- [ ] **[BACKEND-16]** Agregar documentación de la API con Swagger (`@nestjs/swagger`)

---

## 🌐 GitHub Pages — Despliegue de Apps Web

Las apps Flutter pueden compilarse para web y desplegarse en **GitHub Pages**.

### GitHub Actions — Flutter Web

Crea el archivo `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy Flutter Web to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.12.x'

      - name: Build Passenger Web
        run: |
          cd apps/passenger
          flutter pub get
          flutter build web --base-href "/ride_hailing/passenger/"
          mkdir -p ../../gh-pages/passenger
          cp -r build/web/. ../../gh-pages/passenger/

      - name: Build Driver Web
        run: |
          cd apps/driver
          flutter pub get
          flutter build web --base-href "/ride_hailing/driver/"
          mkdir -p ../../gh-pages/driver
          cp -r build/web/. ../../gh-pages/driver/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./gh-pages
```

### GitHub Actions — Admin Next.js

Crea el archivo `.github/workflows/deploy-admin.yml`:

```yaml
name: Deploy Admin to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'apps/admin/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Build Admin
        run: |
          cd apps/admin
          npm install
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/admin/out
```

### Configurar Next.js para exportación estática

En `apps/admin/next.config.ts`, agrega:

```ts
const nextConfig = {
  output: 'export',
  basePath: '/ride_hailing/admin',
  images: { unoptimized: true },
};

export default nextConfig;
```

> **Nota:** Activa GitHub Pages en tu repositorio desde **Settings → Pages → Source: gh-pages branch**.

---

## 🤝 Contribuciones

1. Haz fork del repositorio
2. Crea tu rama: `git checkout -b feature/BACKEND-01-user-module`
3. Commitea tus cambios: `git commit -m "feat: add users module"`
4. Abre un Pull Request referenciando el issue correspondiente

---

## 📄 Licencia

MIT © 2026 — Ride Hailing Project
