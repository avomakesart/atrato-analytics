// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import DataLoader from 'dataloader';
import { Client } from '../../entities';

export const createClientLoader = () =>
  new DataLoader<number, Client>(async (clientIds) => {
    const clients = await Client.findByIds(clientIds as number[]);
    const clientIdToClients: Record<number, Client> = {};

    clients.forEach((cnt) => (clientIdToClients[cnt.id] = cnt));

    return clientIds.map((cardId) => clientIdToClients[cardId]);
  });
