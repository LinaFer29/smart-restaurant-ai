// node:sqlite es nativo en Node 22.5+ (incluido Node 24)
import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

function openDatabase() {
  const localPath = join(process.cwd(), 'restaurant.db');
  const candidates = process.env.VERCEL
    ? ['/tmp/restaurant.db', localPath, ':memory:']
    : [localPath, ':memory:'];

  for (const file of candidates) {
    try {
      const instance = new DatabaseSync(file);
      try {
        instance.exec('PRAGMA journal_mode = WAL');
      } catch {
        // Ignorar si el modo WAL no está disponible en el entorno.
      }
      return instance;
    } catch {
      // Probar siguiente candidato.
    }
  }

  throw new Error('No fue posible inicializar la base de datos SQLite');
}

const db = openDatabase();

db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    available INTEGER DEFAULT 1,
    emoji TEXT DEFAULT '🍽️'
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pendiente',
    customer_name TEXT DEFAULT 'Cliente',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    confirmation_code TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    status TEXT DEFAULT 'confirmada',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    transaction_id TEXT UNIQUE NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );
`);

const menuCount = (db.prepare('SELECT COUNT(*) as n FROM menu_items').get() as { n: number }).n;

if (menuCount === 0) {
  const ins = db.prepare(
    'INSERT INTO menu_items (name, description, price, category, available, emoji) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const items: [string, string, number, string, number, string][] = [
    ['Bandeja Paisa', 'Fríjoles, arroz, chicharrón, chorizo, aguacate y huevo frito', 28000, 'Platos Principales', 1, '🍽️'],
    ['Pollo a la Plancha', 'Pechuga de pollo con papas al vapor y ensalada verde', 22000, 'Platos Principales', 1, '🍗'],
    ['Lomo Saltado', 'Carne de res salteada con papas fritas, tomate y cebolla', 32000, 'Platos Principales', 0, '🥩'],
    ['Trucha al Ajillo', 'Trucha fresca con ajo, mantequilla y hierbas aromáticas', 26000, 'Platos Principales', 1, '🐟'],
    ['Sopa del Día', 'Consultar disponibilidad con el mesero', 12000, 'Entradas', 1, '🍲'],
    ['Empanadas (3 und)', 'Empanadas de pipián con ají casero', 9000, 'Entradas', 1, '🫔'],
    ['Ensalada César', 'Lechuga romana, crotones y queso parmesano', 14000, 'Entradas', 1, '🥗'],
    ['Tabla de Quesos', 'Selección de quesos artesanales con mermelada de frutos rojos', 18000, 'Entradas', 0, '🧀'],
    ['Limonada Natural', 'Limonada con hierbabuena y panela', 6000, 'Bebidas', 1, '🍋'],
    ['Jugo de Maracuyá', 'Jugo natural de maracuyá en leche o agua', 7000, 'Bebidas', 1, '🧃'],
    ['Agua Mineral', 'Con gas o sin gas, 500 ml', 3000, 'Bebidas', 1, '💧'],
    ['Cerveza Artesanal', 'IPA o Stout de producción local', 12000, 'Bebidas', 1, '🍺'],
    ['Brownie con Helado', 'Brownie de chocolate con helado de vainilla artesanal', 11000, 'Postres', 1, '🍫'],
    ['Flan de Caramelo', 'Flan casero con salsa de caramelo', 8000, 'Postres', 0, '🍮'],
    ['Tres Leches', 'Pastel de tres leches con crema chantilly', 9000, 'Postres', 1, '🍰'],
  ];
  for (const row of items) ins.run(...row);
}

export default db;
