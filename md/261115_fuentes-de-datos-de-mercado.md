# Fuentes de datos de mercado

15 de noviembre de 2026

[![Una sala de archivo antigua con ventanillas de madera rotuladas Archivos generales, Mapas de mercados, Libro de cuentas y Reloj de arena y monedas; un visitante de espaldas recibe un pliego de papeles.](../img/261115_fuentes-de-datos-de-mercado.jpg)](../img/261115_fuentes-de-datos-de-mercado.jpg)

Una **API** es una puerta por la que un programa pide datos a un servicio y recibe la respuesta en un formato ordenado. Una **fuente de datos** es un servicio que ofrece datos por API. Una **clave de API** es un código que identifica a quien consulta: unas fuentes lo exigen y otras no. Esta página reúne qué datos da cada fuente. Informa; no recomienda comprar ni vender.

## Binance

Binance es una casa de cambio, un sitio donde se compran y se venden criptomonedas. Una **criptomoneda** es dinero digital registrado en una cadena de bloques, un registro de operaciones que una red de computadoras mantiene según reglas comunes. La API de Binance se entiende mejor separando tres ideas que los nombres mezclan.

**Producto.** El comienzo de la dirección de una función dice a qué parte de Binance pertenece. `/api` es Spot, el mercado al contado, que entrega el activo en el momento de la compra. `/sapi` reúne servicios de cuenta, como la consulta de comisiones. Los futuros, que son contratos sobre un precio posterior, tienen su propia dirección, `fapi.binance.com`.

**Versión.** `v1`, `v2` o `v3` es la revisión de una función concreta; no dice si el dato es público o privado, y la versión no se elige para todo Binance. Spot usa `/api/v3`; en futuros conviven `/fapi/v2/account` y `/fapi/v3/account`.

**Permiso.** Cada función declara su tipo: pública, sin clave; de datos de cuenta, con clave y firma, que es un código calculado con la clave secreta para probar que la petición es de su dueño; de operar, con una clave que tenga permiso de trading, desactivado de manera predeterminada; y de flujo de eventos de la cuenta. Por eso `/api/v3/klines` y `/api/v3/account` comparten producto y versión, y la primera es pública mientras la segunda es privada.

## Spot público, sin clave

Una **vela** resume un intervalo de tiempo con cuatro precios, apertura, máximo, mínimo y cierre, más el volumen negociado. El **libro de órdenes** es la lista de ofertas abiertas de compra y de venta.

| Dato | Función |
|---|---|
| Precio actual | `/api/v3/ticker/price` |
| Cambio, máximo, mínimo y volumen de 24 horas | `/api/v3/ticker/24hr` |
| Mejor precio de compra y de venta | `/api/v3/ticker/bookTicker` |
| Libro de órdenes | `/api/v3/depth` |
| Operaciones recientes | `/api/v3/trades`, `/api/v3/aggTrades` |
| Velas, hasta 1000 por consulta | `/api/v3/klines`, `/api/v3/uiKlines` |
| Pares disponibles y sus reglas | `/api/v3/exchangeInfo` |

Estas funciones también se consultan en `data-api.binance.vision`, un dominio que solo sirve datos públicos. Para historia larga de velas, Binance remite a `data.binance.vision`, donde se descargan archivos.

## Spot privado y operar

Con clave de solo lectura, Spot entrega los saldos de la cuenta (`/api/v3/account`), el estado de las órdenes y las operaciones propias. Poner o cancelar órdenes, como `/api/v3/order`, exige otro permiso de la clave y es otra decisión.

## Cómo llegan los datos

**REST** es pedir un dato y recibir la respuesta. Un **flujo en vivo**, por WebSocket, que es una conexión que queda abierta, hace que Binance envíe cada actualización sin que se pida, por ejemplo `btcusdt@kline_1m`. Binance ofrece también un entorno de pruebas, `demo-api.binance.com`, que no usa dinero real.

## Futuros

La API de futuros USDS-M añade datos de esos contratos, como el historial del interés abierto, que es el total de contratos que siguen abiertos; ese historial cubre solo el último mes. Consultar esos datos es distinto de operar futuros.

## Otras fuentes

| Fuente | Qué da | Clave |
|---|---|---|
| CoinGecko | Precios y capitalización de criptomonedas reunidos de muchas casas de cambio, con historial | Plan Demo gratuito con clave; hay consulta pública sin clave, con menos llamadas |
| Alternative.me, Fear & Greed | Un número de 0, miedo extremo, a 100, codicia extrema, sobre el ánimo del mercado de Bitcoin; el valor actual o el historial diario | No |
| Alpha Vantage | Acciones: cotización y series intradía, diarias, semanales y mensuales; índices, opciones, noticias con sentimiento y datos de las empresas. Algunas funciones son de pago | Sí, gratuita |
| Twelve Data | Series de precios, cotización, último precio y mayores movimientos de acciones, divisas, criptomonedas, fondos y otros | Sí; plan Basic gratuito con créditos limitados |
| FRED, Banco de la Reserva Federal de San Luis | Series de datos económicos con su historial y las fechas en que se revisaron sus valores | Sí, ligada a una cuenta de FRED |
| SEC EDGAR | Historial de presentaciones de cada empresa ante el regulador de Estados Unidos y las cifras de sus estados financieros extraídas de formularios como 10-K, 10-Q y 8-K; no da cotizaciones | No |

El índice de Alternative.me se calcula hoy solo para Bitcoin, con volatilidad, volumen y momentum, redes sociales, encuestas, dominancia y búsquedas en Google. Sus términos piden citar la fuente de forma visible junto a los datos y no usarlos para crear un servicio que se confunda con el suyo. Fuente: Alternative.me.

Los límites de uso y los planes gratuitos cambian; cada fuente publica los vigentes en su página.

## Fuentes

- [Binance Spot](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/general-api-information)
- [Permisos de Binance](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/request-security)
- [Binance futuros USDS-M](https://developers.binance.com/docs/derivatives/usds-margined-futures)
- [Solo datos públicos de Binance](https://developers.binance.com/docs/binance-spot-api-docs/faqs/market_data_only)
- [Binance demo](https://developers.binance.com/docs/binance-spot-api-docs/demo-mode/general-info)
- [CoinGecko](https://docs.coingecko.com/reference/introduction)
- [Alternative.me, índice y API](https://alternative.me/crypto/fear-and-greed-index/)
- [Alpha Vantage](https://www.alphavantage.co/documentation/)
- [Twelve Data](https://twelvedata.com/docs)
- [FRED](https://fred.stlouisfed.org/docs/api/fred/)
- [SEC EDGAR](https://www.sec.gov/search-filings/edgar-application-programming-interfaces)

© 2026 Osmancito
