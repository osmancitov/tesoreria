30 de octubre de 2026

# Hyperliquid desde cero

[![Una plaza veneciana abierta al canal, con un gran tablero de cristal de ofertas en el centro y cambistas y comerciantes a su alrededor; amanece a un lado y anochece al otro; ilustración conceptual al estilo de Canaletto](../img/261030_hyperliquid-desde-cero.jpg)](../img/261030_hyperliquid-desde-cero.jpg)

*Estudio de activos*

Hyperliquid es tres cosas con el mismo nombre: una plataforma donde se apuesta al precio de bitcoin, de acciones y de petróleo; la red de computadoras sobre la que funciona; y una moneda, HYPE, que forma parte de esa red. Quien oye "Hyperliquid" y piensa en una sola de las tres entiende mal las otras dos. Este estudio las separa, explica cada término antes de usarlo y termina con lo que se sabe y lo que no.

## 1. Apostar al precio de algo sin comprarlo

Un **derivado** es un contrato cuyo valor depende del precio de otra cosa. Esa otra cosa es el **activo subyacente**: bitcoin, una acción, una onza de oro. Quien firma el contrato no compra el activo. Compra o vende una apuesta sobre su precio.

El derivado más antiguo es el **contrato de futuros**: un acuerdo para comprar o vender un activo a un precio fijado hoy, en una fecha posterior. Un agricultor que teme que baje el precio del trigo puede fijarlo con meses de antelación. Quien firma del otro lado asume el riesgo de que el precio suba o baje.

Un **contrato perpetuo**, o perpetuo a secas, es un futuro que no tiene fecha de vencimiento. Se puede mantener abierto el tiempo que se quiera. Ese fue el producto con el que Hyperliquid se hizo conocido, y [la documentación de la propia plataforma](https://hyperliquid.gitbook.io/hyperliquid-docs/about-hyperliquid/hyperliquid-101-for-non-crypto-audiences) lo describe como una forma de expresar una posición con **apalancamiento**, es decir, con dinero prestado que multiplica el tamaño de la apuesta.

Un ejemplo con números redondos. Una persona deposita 100 dólares como **margen**, que es la garantía que respalda la apuesta, y abre una posición de 1.000 dólares con un apalancamiento de diez veces. Una **posición larga** gana si el precio sube; una **posición corta** gana si baja. Si el precio se mueve un 5 % a favor, la ganancia es de 50 dólares sobre 100 depositados. Si se mueve un 5 % en contra, la pérdida es la misma. Y si el margen cae por debajo del mínimo que la plataforma exige, ella misma cierra la posición: eso se llama **liquidación**. El apalancamiento multiplica las ganancias y las pérdidas en la misma proporción, y la liquidación llega antes de que el margen se agote del todo.

Como el perpetuo no vence, necesita un mecanismo que lo mantenga cerca del precio real del activo. Ese mecanismo es la **tasa de financiación**: un pago periódico entre quienes tienen posiciones largas y quienes tienen posiciones cortas. Si el perpetuo cotiza por encima del precio del activo, pagan los largos a los cortos; si cotiza por debajo, ocurre lo contrario. En Hyperliquid [se paga cada hora](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding), de persona a persona, sin que la plataforma cobre nada por ese pago.

## 2. Dónde ocurren estas apuestas

Una **casa de cambio digital**, o *exchange* en inglés, es una empresa donde se compran, se venden y se apuestan activos digitales. En las **centralizadas**, la empresa guarda el dinero de los clientes y lleva sus cuentas en sus propios sistemas. El cliente confía en que la empresa pagará.

En una **descentralizada** no hay una empresa que guarde el dinero en sus sistemas. Las cuentas y las operaciones viven en una **cadena de bloques**: un registro de operaciones agrupadas en bloques enlazados, que una red de computadoras mantiene según reglas comunes. Cualquiera puede consultar ese registro. Las computadoras que comprueban y ordenan las operaciones se llaman **validadores**.

El corazón de cualquier casa de cambio es su **libro de órdenes**: la lista, ordenada por precio, de lo que unos ofrecen comprar y otros ofrecen vender. Cuando una oferta de compra y una de venta coinciden, se cierra la operación. En las casas centralizadas ese libro está dentro de los servidores de la empresa. En Hyperliquid el libro está en la cadena de bloques, a la vista de todos.

## 3. Qué es Hyperliquid

Hyperliquid es una cadena de bloques propia, de las que se llaman de **capa 1**, es decir, independientes y no construidas sobre otra. [La documentación](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/overview) la divide en dos partes. **HyperCore** guarda el libro de órdenes, los márgenes y las liquidaciones. **HyperEVM** es la parte de uso general: una **EVM** es la máquina virtual de Ethereum, el entorno donde corren los **contratos inteligentes**, programas que viven en la cadena y se ejecutan solos cuando se cumplen sus condiciones.

La velocidad es el argumento central. Según la documentación, una orden enviada desde cerca de los servidores tarda en promedio una quinta parte de segundo en quedar confirmada, y la red procesa unas 200.000 órdenes por segundo. Son cifras que declara el proyecto, no una medición independiente.

El desarrollo lo lidera [Hyperliquid Labs](https://hyperliquid.gitbook.io/hyperliquid-docs/about-hyperliquid/core-contributors), fundada por dos compañeros de la Universidad de Harvard, Jeff Yan y un colega que firma como iliensinc. Hacían compraventa profesional de criptomonedas desde 2020. El proyecto asegura que se financió sin capital externo: no recibió dinero de fondos de inversión.

## 4. Cómo se entra y quién puede entrar

Se opera con **USDC**, una **moneda estable**: una moneda digital que busca valer siempre un dólar. Se deposita desde otra cadena o desde una casa de cambio centralizada, y [la propia documentación](https://hyperliquid.gitbook.io/hyperliquid-docs/onboarding/how-to-start-trading) explica cómo.

El acceso no es universal. Los [términos de uso](https://app.hyperliquid.xyz/terms) excluyen a quien resida o esté constituido en Estados Unidos u Ontario, en Canadá, y en jurisdicciones bajo sanciones económicas, y prohíben ocultar la ubicación con una VPN, un servicio que disfraza desde dónde se conecta una persona. Esas reglas rigen la página web de la plataforma.

## 5. Qué pasa cuando una apuesta sale mal

La plataforma publica [las reglas de las liquidaciones](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/liquidations). Primero intenta cerrar la posición lanzando órdenes al libro. Si el margen se hunde más de la cuenta y eso falla, interviene un fondo común llamado **HLP**, siglas en inglés de proveedor de liquidez de Hyperliquid. Es un **vault**, una bolsa de dinero que depositan los usuarios y que la plataforma usa para ofrecer compras y ventas, absorber posiciones liquidadas y repartir el resultado entre quienes aportaron. Los depósitos quedan bloqueados cuatro días.

Si aun así la cuenta de alguien queda en negativo, entra el último recurso, el **desapalancamiento automático**. La plataforma cierra posiciones de quienes están del lado contrario y ganan, ordenadas por ganancia y por apalancamiento, para que no quede deuda sin cubrir. Es un mecanismo que protege a la plataforma y puede perjudicar a quien iba ganando.

Todas esas reglas necesitan un **precio de referencia** confiable. Un **oráculo** es el mecanismo que trae a la cadena un precio que se forma fuera de ella. En Hyperliquid [los validadores publican cada tres segundos](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/oracle) el precio de cada activo, calculado como una **mediana ponderada** de ocho casas de cambio, es decir, el valor central donde unas fuentes pesan más que otras, entre ellas Binance, OKX y Bybit.

## 6. Más allá de las criptomonedas

Una **HIP** es una propuesta de mejora de Hyperliquid, por sus siglas en inglés. [La HIP-3](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals) permite que un tercero cree sus propios mercados de perpetuos dentro de Hyperliquid, con tal de mantener bloqueadas 500.000 monedas HYPE como garantía y responder por lo que lista. El tercero define el contrato, el precio de referencia y el apalancamiento máximo.

El más grande de esos terceros es Trade[XYZ], que lista perpetuos sobre acciones, índices, materias primas y divisas, las 24 horas, todos los días. Según [una estadística de un sitio especializado](https://www.coinperps.com/learn/hyperliquid-hip-3-statistics), los mercados creados con la HIP-3 movieron unos 65.000 millones de dólares en 30 días, cerca de la cuarta parte del volumen de Hyperliquid, y en julio las acciones individuales y los contratos sobre empresas aún no cotizadas ya eran la mayor parte.

[La HIP-4](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-4-outcome-markets) añade otro tipo de contrato: el **mercado de resultados**, donde se compra "sí" o "no" a un hecho y el contrato liquida a un valor fijo, sin apalancamiento ni liquidaciones. El primero, según la documentación, liquida cada día en función del precio de bitcoin.

El 18 de septiembre Hyperliquid abrió además [préstamos directos](https://cryptoslate.com/hyperliquid-opens-native-lending-as-hype-hits-new-ath-above-90/): se entrega HYPE o bitcoin como garantía y se recibe un préstamo en moneda estable. Ese día se prestaron unos 270 millones de dólares.

## 7. La moneda HYPE

Una **moneda digital**, o *token*, es una unidad registrada en una cadena de bloques. HYPE es la de Hyperliquid. Sirve para pagar el costo de operar en HyperEVM, para obtener descuentos en comisiones, como garantía para crear mercados con la HIP-3 y para el *staking*.

El **staking** consiste en entregar monedas a un validador para que respalde con ellas el funcionamiento de la red, a cambio de una recompensa. [La documentación](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/staking) fija la recompensa en torno al 2 % anual y exige siete días de espera para retirar las monedas entregadas.

El suministro máximo es de 1.000 millones de monedas. La emisión inicial fue el 29 de noviembre de 2024, cuando [el 31 % se repartió gratis entre unos 94.000 usuarios](https://hyperacademy.io/en/articles/hype-tokenomics-deep-dive) según su actividad previa. Otro 24 % corresponde a los colaboradores principales, con liberación gradual, sobre todo entre 2027 y 2028, y casi 39 % está reservado a emisiones futuras y recompensas. No hubo venta a inversores externos. Hoy circula alrededor de una cuarta parte del total, unos 240 millones de monedas.

Lo más citado de HYPE es su recompra. El **Fondo de Asistencia** es una dirección del sistema que [convierte automáticamente en HYPE casi todas las comisiones de la plataforma](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees) y, según la documentación, destruye esas monedas. Al 13 de octubre había [gastado unos 1.400 millones de dólares y retirado unos 48 millones de monedas](https://www.tokenpost.com/news/investing/30998), según un seguimiento de terceros. Como el dinero para comprar depende de cuánto se opere, [la recompra crece con el volumen y se achica con él](https://quantabundancia.com/articles/hype-tokenomics-assistance-fund-buyback): no es un piso para el precio.

## 8. Quién valida

Hay 27 validadores activos. Según [una auditoría de julio](https://crypto.news/who-actually-runs-hyperliquid-the-governance-audit/), cinco de ellos los opera la Fundación de Hyperliquid y reúnen cerca de la mitad de las monedas entregadas en *staking*; a comienzos de 2025 esa proporción era del 81 %. La misma auditoría señala que el programa de los validadores sigue siendo de código cerrado: quien lo ejecuta no puede leerlo.

## 9. El precio y el momento

HYPE tocó su mínimo, unos 4 dólares, el día del reparto inicial, y hoy ronda los 92, según [CoinGecko](https://www.coingecko.com/en/coins/hyperliquid). Su máximo histórico, cerca de 98 dólares, fue el 23 de septiembre. Su valor de mercado, el precio por las monedas en circulación, es de unos 22.000 millones de dólares; si se contaran todas las monedas previstas, rondaría los 88.000 millones.

El 29 de octubre la moneda subió entre 13 % y 15 %, según el medio, cuando Intercontinental Exchange, la empresa dueña de la Bolsa de Nueva York, anunció [un acuerdo con Trade[XYZ]](https://ir.theice.com/press/news-details/2026/Intercontinental-Exchange-and-TradeXYZ-to-Bring-Hyperliquid-Based-Perpetual-Markets-Onshore/default.aspx) para llevar sus perpetuos a Estados Unidos dentro de un mercado regulado, con una inversión de ICE en Trade[XYZ]. Falta la aprobación de los reguladores. El comunicado no menciona la moneda HYPE; nombra a Hyperliquid solo como la infraestructura sobre la que funcionan esos mercados. El inversionista Stanley Druckenmiller [dijo en X que invierte en Trade[XYZ]](https://www.cnbc.com/2026/10/29/druckenmiller-hyperliquid-surge.html).

## 10. Lo que ha puesto a prueba la plataforma

En marzo de 2025 un operador apostó en corto con mucho apalancamiento por una moneda poco negociada, JELLY, y empujó su precio en otros mercados. El fondo HLP heredó la posición y llegó a perder más de 13 millones de dólares sin realizar. [Los validadores votaron cerrar el mercado](https://www.coindesk.com/markets/2025/03/26/hyperliquid-delists-jellyjelly-after-vault-squeezed-in-usd13m-tussle) y liquidarlo a un precio que protegía al fondo. HYPE cayó cerca de un 20 %, y hubo críticas sobre cuánto poder tienen en realidad pocos validadores.

El 10 de octubre de 2025, tras un anuncio de aranceles, [más de 1.000 cuentas fueron liquidadas por completo en Hyperliquid](https://www.coindesk.com/markets/2025/10/11/largest-ever-crypto-liquidation-event-wipes-out-6-300-wallets-on-hyperliquid) y se borraron más de 1.200 millones de dólares de capital de traders, dentro de la mayor liquidación en un solo día que haya registrado el mercado de criptomonedas. La plataforma siguió funcionando.

## 11. Cómo leer las cifras

Cuatro números se confunden con frecuencia. El **volumen** es lo que se operó durante un período. El **interés abierto** es el total de apuestas que siguen abiertas en un momento dado: una existencia, no un flujo. Las **comisiones** son lo que cobra la plataforma. La **recompra** es la parte de esas comisiones que se vuelve a HYPE. Un volumen alto con poco interés abierto indica mucho movimiento y poco dinero que se quede; lo contrario indica pocas operaciones y posiciones largas.

Hoy el interés abierto de Hyperliquid anda en 15.000 millones de dólares, de los cuales unos 11.000 millones están en sus mercados propios y unos 4.000 millones en los creados con la HIP-3, según [un seguimiento de los datos de la propia plataforma](https://cipher-intelligence.io/blog/perpetual-dex-open-interest-guide/). En el tercer trimestre, [Hyperliquid tuvo el 58 % del interés abierto de los perpetuos en cadena y el 39 % del volumen](https://alearesearch.io/newsletters/hyperliquid-held-580-of-onchain-perp), lo que indica que sus usuarios mantienen las posiciones más tiempo.

Una distinción de este estudio: que se use mucho la plataforma no demuestra que su moneda deba subir. La plataforma es una aplicación, la red es la cadena que la sostiene, y la moneda es una parte de esa red. Lo que una gana no pasa a la otra sin un mecanismo que lo disponga; en este caso, ese mecanismo es la recompra, y depende del volumen.

## 12. Riesgos y alcance

Los riesgos de Hyperliquid se reparten así. **Para quien opera:** el apalancamiento puede liquidar la cuenta entera, y el desapalancamiento automático puede cerrar posiciones ganadoras. **Para la red:** pocos validadores, la mitad del *staking* en manos de la fundación y un programa de código cerrado. **Para el precio de HYPE:** las monedas de los colaboradores siguen liberándose hasta 2028 y las estimaciones de cuánto sale cada mes difieren entre fuentes; el valor de mercado total es muy distinto del circulante. **Para el negocio:** la aprobación regulatoria del acuerdo con ICE está pendiente, y la plataforma está cerrada a Estados Unidos.

Este estudio explica y no recomienda comprar, vender ni abrir cuentas. Las cifras de volumen, interés abierto y recompra provienen de seguimientos de terceros, no de un registro oficial único, y cambian cada día.

<details><summary>Datos exactos</summary>

| Dato | Valor | Fuente |
| --- | --- | --- |
| Precio de HYPE | 92,33 dólares | CoinGecko |
| Máximo histórico | 97,96 dólares, 23 de septiembre de 2026 | CoinGecko |
| Mínimo histórico | 3,81 dólares, 29 de noviembre de 2024 | CoinGecko |
| Suministro máximo | 1.000.000.000 | CoinGecko |
| En circulación | 239.406.814 | CoinGecko |
| Valor de mercado circulante | 22.104.410.596 dólares | CoinGecko |
| Valor de mercado con todo el suministro previsto | 87.855.446.962 dólares | CoinGecko |
| Interés abierto total | 14.900 millones de dólares | Cipher Intelligence, interfaz de Hyperliquid |
| Interés abierto en mercados propios | 10.900 millones de dólares | Cipher Intelligence |
| Interés abierto en mercados HIP-3 | 3.980 millones de dólares | Cipher Intelligence |
| Volumen HIP-3 en 30 días | 64.700 millones de dólares, 26,7 % del total | Coinperps |
| Volumen del tercer trimestre | 688.700 millones de dólares | Alea Research |
| Parte del interés abierto en cadena, tercer trimestre | 58,0 % | Alea Research |
| Parte del volumen en cadena, tercer trimestre | 38,6 % | Alea Research |
| Recompra acumulada al 13 de octubre | 1.365 millones de dólares, más de 48 millones de HYPE | TokenPost |
| Reparto inicial | 31 % usuarios, 23,8 % colaboradores, 38,89 % emisiones futuras, 6 % Fundación | Hyper Academy |
| Validadores activos | 27, de ellos 5 de la Fundación con 49,3 % de las monedas entregadas | crypto.news, julio de 2026 |
| Recompensa de *staking* | 2,37 % anual con 400 millones de HYPE entregados | Documentación de Hyperliquid |
| Salto de HYPE el 29 de octubre | entre 13 % y 15 %, a unos 91 dólares | The Block, Decrypt |

</details>

## Fuentes

- [Hyperliquid, documentación oficial](https://hyperliquid.gitbook.io/hyperliquid-docs): introducción, HyperCore, liquidaciones, financiación, oráculo, *staking*, HIP-3 y HIP-4.
- [Términos de uso de Hyperliquid](https://app.hyperliquid.xyz/terms): personas excluidas.
- [ICE: comunicado del 29 de octubre de 2026](https://ir.theice.com/press/news-details/2026/Intercontinental-Exchange-and-TradeXYZ-to-Bring-Hyperliquid-Based-Perpetual-Markets-Onshore/default.aspx).
- [The Block: HYPE sube con el acuerdo de ICE](https://www.theblock.co/news/business/2026-10-29-ice-tradexyz-hyperliquid-perpetual-futures-us-432132).
- [CNBC: Druckenmiller y Trade[XYZ]](https://www.cnbc.com/2026/10/29/druckenmiller-hyperliquid-surge.html).
- [CoinGecko: HYPE](https://www.coingecko.com/en/coins/hyperliquid): precio, suministro y valor de mercado.
- [Hyper Academy: reparto de HYPE](https://hyperacademy.io/en/articles/hype-tokenomics-deep-dive).
- [QuantAbundancia: el Fondo de Asistencia](https://quantabundancia.com/articles/hype-tokenomics-assistance-fund-buyback) y [TokenPost: compras acumuladas](https://www.tokenpost.com/news/investing/30998).
- [crypto.news: quién gobierna Hyperliquid](https://crypto.news/who-actually-runs-hyperliquid-the-governance-audit/).
- [CoinDesk: caso JELLY](https://www.coindesk.com/markets/2025/03/26/hyperliquid-delists-jellyjelly-after-vault-squeezed-in-usd13m-tussle) y [CoinDesk: 10 de octubre de 2025](https://www.coindesk.com/markets/2025/10/11/largest-ever-crypto-liquidation-event-wipes-out-6-300-wallets-on-hyperliquid).
- [Coinperps: estadísticas de la HIP-3](https://www.coinperps.com/learn/hyperliquid-hip-3-statistics), [Cipher Intelligence: interés abierto](https://cipher-intelligence.io/blog/perpetual-dex-open-interest-guide/) y [Alea Research: tercer trimestre](https://alearesearch.io/newsletters/hyperliquid-held-580-of-onchain-perp).
- [CryptoSlate: préstamos directos](https://cryptoslate.com/hyperliquid-opens-native-lending-as-hype-hits-new-ath-above-90/).

© 2026 Osmancito
