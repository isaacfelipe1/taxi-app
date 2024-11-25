import { Router } from 'express';
import {
  getCustomerRides,
  estimate,
  confirmRide,
} from '../controllers/rideController';

const router = Router();

/**
 * @swagger
 * /ride/{customer_id}:
 *   get:
 *     summary: Lista todas as corridas de um cliente
 *     description: Retorna todas as corridas associadas ao ID do cliente fornecido, opcionalmente filtradas por driver_id.
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *       - in: query
 *         name: driver_id
 *         required: false
 *         schema:
 *           type: number
 *         description: ID do motorista para filtrar as corridas
 *     responses:
 *       200:
 *         description: Lista de corridas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Nenhuma corrida encontrada
 */
router.get('/:customer_id', getCustomerRides);

/**
 * @swagger
 * /ride/estimate:
 *   post:
 *     summary: Estima o custo de uma corrida
 *     description: Recebe origem, destino e ID do cliente para calcular a estimativa de uma corrida.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: ID do cliente que solicita a corrida
 *               origin:
 *                 type: string
 *                 description: Local de origem
 *               destination:
 *                 type: string
 *                 description: Local de destino
 *     responses:
 *       200:
 *         description: Estimativa calculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ride:
 *                       type: object
 *                     drivers:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Nenhum motorista disponível
 */
router.post('/estimate', estimate);

/**
 * @swagger
 * /ride/confirm:
 *   patch:
 *     summary: Confirma uma corrida
 *     description: Confirma uma corrida com base no ID do cliente e do motorista escolhido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: ID do cliente que está confirmando a corrida
 *               driver_id:
 *                 type: number
 *                 description: ID do motorista escolhido
 *     responses:
 *       200:
 *         description: Corrida confirmada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Dados não encontrados
 */
router.patch('/confirm', confirmRide);

export default router;
