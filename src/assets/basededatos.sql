CREATE TABLE IF NOT EXISTS habitos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT, 
    descripcion TEXT,
    color TEXT,
    hora TEXT,
    fechainicio DATE,
    fechafin DATE,
    frasemotivacional TEXT
);