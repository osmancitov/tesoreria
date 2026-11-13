# Gainers y losers

13 de noviembre de 2026

[![Un valle al amanecer: una cumbre nevada y dorada a la izquierda, un lago quieto en el centro y un barranco oscuro a la derecha, unidos por un sendero de piedra con viajeros diminutos.](../img/261113_gainers-y-losers.jpg)](../img/261113_gainers-y-losers.jpg)

Binance es una casa de cambio, un sitio donde se compran y se venden activos. Un **activo** es un producto que se compra y se vende en un mercado. Un **par** es un activo junto con la moneda en que se cotiza, y el par se nombra con los símbolos de los dos juntos. Aquí la moneda de cotización es USDT, una moneda estable, es decir, diseñada para valer un dólar, y los pares se llaman BTCUSDT, ETHUSDT y así. Los pares que más suben son los *gainers* y los que más bajan son los *losers*: son los dos extremos de una misma lista.

La consulta se hizo el 13 de noviembre de 2026 a las 10:03 (UTC-4) a la **API** de Binance, su servicio web de datos.

La lista reúne 518 pares con USDT que Binance negociaba al contado. Cada par lleva su posición en la lista completa, de la mayor variación a la menor; si dos pares tienen la misma variación, va primero el de símbolo menor en orden alfabético. Los porcentajes se presentan redondeados a enteros.

De los 518 pares, 363 suben (70 %), 11 quedan en cero (2 %) y 144 bajan (28 %).

## Variación ponderada

La [capitalización del 11 de noviembre](261111_ranking-de-capitalizacion.md) se multiplica por el porcentaje de esta consulta y se divide entre cien. Esa es la **variación ponderada**, una magnitud aproximada en dólares para comparar el tamaño de las subidas y las bajadas, no dinero que entró o salió ni un cambio de capitalización medido.

El cruce reúne 517 activos: EUR no tiene capitalización en la base y USDT no tiene par en esta consulta. Los importes están en millones de dólares, redondeados después de ordenar.

### Los diez que más suben por ponderación

| N.º | Par | Mill. USD |
|---:|---|---:|
| 1 | HYPEUSDT | 952 |
| 2 | NEARUSDT | 255 |
| 3 | XLMUSDT | 177 |
| 4 | LINKUSDT | 139 |
| 5 | ADAUSDT | 136 |
| 6 | SUIUSDT | 111 |
| 7 | TAOUSDT | 107 |
| 8 | AVAXUSDT | 103 |
| 9 | DOGEUSDT | 96 |
| 10 | PEPEUSDT | 85 |

### Los diez que más bajan por ponderación

| N.º | Par | Mill. USD |
|---:|---|---:|
| 508 | ETHFIUSDT | -21 |
| 509 | HBARUSDT | -33 |
| 510 | UNIUSDT | -59 |
| 511 | WBETHUSDT | -172 |
| 512 | TRXUSDT | -209 |
| 513 | GRAMUSDT | -276 |
| 514 | WBTCUSDT | -344 |
| 515 | BNBUSDT | -1.807 |
| 516 | ETHUSDT | -5.645 |
| 517 | BTCUSDT | -61.140 |

## Variación porcentual

### Los diez que más suben

| N.º | Par | 24 h (%) |
|---:|---|---:|
| 1 | BARDUSDT | 87 |
| 2 | SOPHUSDT | 45 |
| 3 | DODOUSDT | 21 |
| 4 | OSMOUSDT | 15 |
| 5 | CBRSBUSDT | 12 |
| 6 | PLUMEUSDT | 10 |
| 7 | 牛来USDT | 10 |
| 8 | INJUSDT | 9 |
| 9 | NVDABUSDT | 9 |
| 10 | 0GUSDT | 8 |

### Los diez que más bajan

Van en el orden de la lista: el que más baja queda al final.

| N.º | Par | 24 h (%) |
|---:|---|---:|
| 509 | BTTCUSDT | -6 |
| 510 | SOXSBUSDT | -7 |
| 511 | MANTRAUSDT | -7 |
| 512 | SYRUPUSDT | -7 |
| 513 | GRAMUSDT | -8 |
| 514 | ONEUSDT | -9 |
| 515 | HAEDALUSDT | -9 |
| 516 | INITUSDT | -11 |
| 517 | ERAUSDT | -16 |
| 518 | BANANAS31USDT | -18 |

## Los neutros

Los **neutros** son los pares cuya variación publicada es cero. Son 11, de la posición 364 a la 374.

| N.º | Par | 24 h (%) |
|---:|---|---:|
| 364 | AMPUSDT | 0 |
| 365 | BFUSDUSDT | 0 |
| 366 | GUSDT | 0 |
| 367 | HOMEUSDT | 0 |
| 368 | IDUSDT | 0 |
| 369 | LAZIOUSDT | 0 |
| 370 | NMRUSDT | 0 |
| 371 | TUSDUSDT | 0 |
| 372 | USDEUSDT | 0 |
| 373 | XNOUSDT | 0 |
| 374 | ZENUSDT | 0 |

## Fuentes

Binance: la lista de 24 horas, `https://data-api.binance.vision/api/v3/ticker/24hr`, y el catálogo de pares, `https://data-api.binance.vision/api/v3/exchangeInfo`, consultados el 13 de noviembre de 2026 a las 10:03 (UTC-4). La documentación de la API está en la [guía de Binance Spot](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md).

© 2026 Osmancito
