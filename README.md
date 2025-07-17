# Product Paid API

## 📋 Descripción

Product Paid API es una aplicación backend robusta desarrollada con Node.js y TypeScript que proporciona una API RESTful para gestionar productos, clientes, transacciones y entregas. El proyecto integra servicios de pago a través de Wompi y está diseñado con una arquitectura limpia y escalable.

## 🚀 Características principales

- **Gestión de Productos**: CRUD completo para administrar el catálogo de productos
- **Gestión de Clientes**: Registro y administración de información de clientes
- **Procesamiento de Transacciones**: Integración con Wompi para procesar pagos
- **Sistema de Entregas**: Gestión de información de entregas asociadas a transacciones
- **Tokenización de Tarjetas**: Manejo seguro de información de tarjetas de crédito
- **Documentación Swagger**: API completamente documentada con Swagger UI
- **Base de datos PostgreSQL**: Persistencia de datos con Prisma ORM

## 🛠️ Tecnologías utilizadas

### Backend

- **Node.js** - Entorno de ejecución de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js 5** - Framework web minimalista y flexible
- **Prisma ORM** - ORM moderno para TypeScript y Node.js
- **PostgreSQL** - Sistema de gestión de base de datos relacional

### Herramientas de desarrollo

- **ts-node-dev** - Herramienta para desarrollo con hot-reload
- **Swagger** - Documentación interactiva de API
- **Docker & Docker Compose** - Containerización y orquestación
- **Axios** - Cliente HTTP para consumir APIs externas
- **CORS** - Middleware para habilitar CORS
- **dotenv** - Manejo de variables de entorno
- **env-var** - Validación de variables de entorno

## 📁 Estructura del proyecto

```
product-paid-api/
├── src/
│   ├── app.ts                    # Punto de entrada de la aplicación
│   ├── config/                   # Configuraciones generales
│   │   ├── api.ts                # Configuración de API
│   │   ├── env.ts                # Variables de entorno
│   │   ├── generateSecret.ts     # Generador de secretos
│   │   └── swagger.ts            # Configuración de Swagger
│   ├── data/                     # Capa de datos
│   │   ├── postgres-db/          # Configuración de base de datos
│   │   └── seed/                 # Seeds para la base de datos
│   ├── domain/                   # Capa de dominio
│   │   ├── dtos/                 # Data Transfer Objects
│   │   │   ├── card/             # DTOs de tarjetas
│   │   │   ├── customer/         # DTOs de clientes
│   │   │   ├── delivery/         # DTOs de entregas
│   │   │   └── transaction/      # DTOs de transacciones
│   │   └── errors/               # Manejo de errores personalizados
│   ├── interfaces/               # Interfaces TypeScript
│   └── presentation/             # Capa de presentación
│       ├── customers/            # Módulo de clientes
│       ├── deliveries/           # Módulo de entregas
│       ├── products/             # Módulo de productos
│       ├── provider/             # Módulo de proveedor de pagos
│       ├── token/                # Módulo de tokenización
│       ├── transactions/         # Módulo de transacciones
│       ├── services/             # Servicios de negocio
│       ├── routes.ts             # Rutas principales
│       └── server.ts             # Configuración del servidor
├── prisma/
│   └── schema.prisma             # Esquema de base de datos
├── docker-compose.yml            # Configuración de Docker
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias y scripts
└── .env                          # Variables de entorno (no versionado)
```

## 🔧 Instalación y configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- PostgreSQL (o Docker para usar contenedores)
- Git

### Pasos de instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/hugomendoza/product-paid-api.git
   cd product-paid-api
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   # Puerto del servidor
   PORT=3000

   # URL de la API
   API_URL=https://api.dev/v1

   # Credenciales de Wompi
   PUBLIC_KEY=pub_stagtest_ABC_123
   INTEGRITY_KEY=stagtest_integrity_ABC_123

   # Base de datos PostgreSQL
   POSTGRES_URL=postgresql://usuario:password@localhost:5432/product_paid_db
   POSTGRES_USER=tu_usuario
   POSTGRES_PASSWORD=tu_password
   POSTGRES_DB=product_paid_db
   ```

4. **Configurar la base de datos con Docker**

   ```bash
   docker-compose up -d
   ```

5. **Ejecutar migraciones de Prisma**

   ```bash
   npx prisma migrate dev
   ```

6. **Generar el cliente de Prisma**

   ```bash
   npx prisma generate
   ```

7. **Ejecutar seeds (opcional)**
   ```bash
   npm run seed
   ```

## 🚀 Uso

### Scripts disponibles

- **Desarrollo con hot-reload**

  ```bash
  npm run dev
  ```

- **Compilar para producción**

  ```bash
  npm run build
  ```

- **Ejecutar en producción**

  ```bash
  npm start
  ```

- **Ejecutar seeds**
  ```bash
  npm run seed
  ```

### Endpoints de la API

La API expone los siguientes endpoints principales:

#### 🛍️ Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `PATCH /api/products/:id` - Actualizar el stock de un producto

#### 👥 Clientes

- `POST /api/customers` - Registrar un nuevo cliente

#### 💳 Transacciones

- `GET /api/transactions` - Obtener todas las transacciones
- `GET /api/transactions/:id` - Obtener una transacción por ID
- `POST /api/transactions` - Crear una nueva transacción

#### 🚚 Entregas

- `POST /api/deliveries` - Crear una nueva entrega

#### 💳 Tokenización de tarjetas

- `POST /api/card` - Tokenizar una tarjeta

#### 🏢 Proveedor de pagos

- `POST /api/provider` - Procesar transacción con proveedor
- `POST /api/provider/:id` - Verificar el estatus de una transacción

### Documentación Swagger

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación interactiva de la API en:

```
http://localhost:3000/api-docs
```

## 📊 Modelo de datos

### Entidades principales

#### Product (Producto)

- `id`: UUID único
- `name`: Nombre del producto
- `description`: Descripción
- `price`: Precio
- `stock`: Cantidad en inventario
- `image_url`: URL de la imagen
- `createdAt`: Fecha de creación

#### Customer (Cliente)

- `id`: UUID único
- `name`: Nombre completo
- `email`: Correo electrónico
- `phone`: Teléfono
- `address`: Dirección
- `city`: Ciudad
- `createdAt`: Fecha de registro

#### Transaction (Transacción)

- `id`: UUID único
- `wompi_transaction_id`: ID de transacción en Wompi
- `status`: Estado (PENDING, APPROVED, DECLINED, FAILED)
- `product_amount`: Monto del producto
- `base_fee`: Tarifa base
- `delivery_fee`: Tarifa de entrega
- `total_amount`: Monto total
- `payment_method`: Método de pago
- `customerId`: Referencia al cliente
- `productId`: Referencia al producto
- `createdAt`: Fecha de creación

#### Delivery (Entrega)

- `id`: UUID único
- `customer_address`: Dirección de entrega
- `city`: Ciudad de entrega
- `transactionId`: Referencia a la transacción
- `createdAt`: Fecha de creación

## 🔒 Seguridad

- Todas las transacciones de pago se procesan a través de Wompi
- Las tarjetas de crédito se tokenizan para mayor seguridad
- Validación de variables de entorno al iniciar la aplicación
- Manejo de errores personalizado
- CORS configurado para controlar el acceso
