import fastify from 'fastify';
import { registerSwagger } from './config/swagger.js';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { orgsRoutes } from './http/routes/org-routes.js';
import { globalErrorHandler } from './errors/global-error-handler.js';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// registros
await registerSwagger(app);

// rotas
app.register(orgsRoutes);

// global errors
app.setErrorHandler(globalErrorHandler);
