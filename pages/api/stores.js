import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'stores.json');

export default async function handler(req, res) {
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  const stores = JSON.parse(jsonData);

  if (req.method === 'GET') {
    res.status(200).json(stores);
  } else if (req.method === 'POST') {
    const newStore = req.body;
    newStore.id = stores.length > 0 ? Math.max(...stores.map(s => s.id)) + 1 : 1;
    stores.push(newStore);
    
    await fs.writeFile(dataFilePath, JSON.stringify(stores, null, 2), 'utf8');
    res.status(201).json(newStore);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
