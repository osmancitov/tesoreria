# Libro del registro

`generar-libro.mjs` regenera `html/estado-del-registro.html` a partir de la
copia del registro que vive en este repositorio (`registro/`) y de la
identidad de cada activo (`libro/identidad.json`).

Paso de cada sincronización, desde la raíz del repositorio:

```
node libro/generar-libro.mjs
```

- Requiere Node 18 o superior. Sin dependencias.
- Lee `registro/` (nunca escribe ahí) y rehace la página: activos, cobertura,
  huecos o duplicados, orden por capitalización.
- Intenta actualizar las capitalizaciones desde CoinGecko; si lo logra,
  reescribe `libro/identidad.json` con los valores y la fecha de la consulta.
  Si no hay red, usa las guardadas (`--sin-red` salta la consulta).
- Escribe la página de forma atómica (temporal + renombrado).
- `--salida RUTA` escribe en otra ruta, para probar sin tocar la página.

Después de regenerar, la página y `libro/identidad.json` (si cambió) se suben
en el mismo commit que los datos de la sincronización.
