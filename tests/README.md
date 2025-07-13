# Tests Unitarios - Product Paid API

Este directorio contiene todos los tests unitarios para el proyecto Product Paid API.

## Estructura de Tests

La estructura de los tests sigue la misma organización que la carpeta `src`:

```
tests/
├── config/
│   └── env.test.ts
├── domain/
│   ├── dtos/
│   │   ├── customer/
│   │   │   └── create-customer.test.ts
│   │   ├── delivery/
│   │   │   └── create-delivery.test.ts
│   │   └── transaction/
│   │       └── create-transaction.test.ts
│   └── errors/
│       └── custom.error.test.ts
├── presentation/
│   ├── products/
│   │   └── controller.test.ts
│   ├── services/
│   │   └── product.service.test.ts
│   └── server.test.ts
├── __mocks__/
│   └── prisma.ts
├── setup.ts
└── README.md
```

## Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (se ejecutan automáticamente al hacer cambios)
```bash
npm run test:watch
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

### Ejecutar tests específicos
```bash
# Ejecutar tests de un archivo específico
npm test -- custom.error.test.ts

# Ejecutar tests que coincidan con un patrón
npm test -- --testNamePattern="should create"

# Ejecutar tests de una carpeta específica
npm test -- tests/domain
```

## Configuración

- **Framework**: Jest
- **Preset**: ts-jest (para soporte de TypeScript)
- **Entorno**: Node.js
- **Cobertura**: Se excluyen archivos de definición de tipos, index.ts, app.ts y archivos de seed

## Mocks

### Prisma Mock
Se utiliza `jest-mock-extended` para crear mocks de Prisma Client. El mock está disponible en `tests/__mocks__/prisma.ts` y se auto-importa en los tests que lo necesitan.

### Variables de Entorno
Las variables de entorno necesarias para los tests se configuran en `tests/setup.ts`.

## Escribir Nuevos Tests

1. Crea un archivo con el sufijo `.test.ts` o `.spec.ts`
2. Importa las dependencias necesarias
3. Usa `describe` para agrupar tests relacionados
4. Usa `it` o `test` para escribir casos de prueba individuales
5. Usa `beforeEach` y `afterEach` para setup y cleanup

### Ejemplo de Test

```typescript
import { MyClass } from '../src/my-class';

describe('MyClass', () => {
  let instance: MyClass;

  beforeEach(() => {
    instance = new MyClass();
  });

  it('should do something', () => {
    const result = instance.doSomething();
    expect(result).toBe(expectedValue);
  });
});
```

## Mejores Prácticas

1. **Aislamiento**: Cada test debe ser independiente
2. **Claridad**: Los nombres de los tests deben ser descriptivos
3. **Cobertura**: Intenta cubrir tanto casos de éxito como de error
4. **Mocks**: Usa mocks para dependencias externas (base de datos, APIs, etc.)
5. **Limpieza**: Siempre limpia los mocks y estados después de cada test

## Próximos Pasos

Para completar la suite de tests, se necesita crear tests para:

- Controllers de customers, deliveries, transactions
- Services de customer, delivery, transaction
- Routes de todos los módulos
- Archivos de configuración adicionales
