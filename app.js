/* ============================================================
   TURKIANA — app.js  (v3.0 — Ultra-Luxury Production)
   Merged app.js + app-enhancements.js
   Modules: Data → I18N → State → DOM → Render → Filter →
            Events → Cursor → Hero → Observers → Modals →
            PWA → Init
============================================================ */
(function () {
  'use strict';

  /* ============================================================
     §1  DATA
  ============================================================ */
  const CURRENCY = 'QAR';
  const IMG_BASE = 'https://turkianacafe-ux.github.io/Turkiana/assets/images/';

  /* Items that serve both hot and iced */
  const HOT_ICED_KEYS = ['cafe','tea','refreshers'];

  const CATEGORIES = [
    { key:'all',        en:'All',               ar:'الكل' },
    { key:'brewed',     en:'Turkish Coffees',    ar:'قهوة تركية' },
    { key:'tea',        en:'Tea & Infusions',    ar:'شاي ومنقوع' },
    { key:'cafe',       en:'Classic Cafés',      ar:'كافيهات' },
    { key:'specialty',  en:'Signature Drinks',   ar:'مشروبات مميزة' },
    { key:'refreshers', en:'Mojitos & Juice',    ar:'موخيتو وعصائر' },
    { key:'baklava',    en:'Baklava & Desserts', ar:'بقلاوة وحلويات' },
    { key:'snacks',     en:'Snacks & Nuts',      ar:'مكسرات ومسليات' },
    { key:'croissant',  en:'Fresh Bakery',       ar:'مخبوزات طازجة' },
  ];

  const BADGE_LABELS = { bestseller:'Best Seller', signature:'Signature', limited:'Limited' };

  const DIET_LABELS = {
    'vegan':          'Vegan',
    'gluten-free':    'Gluten Free',
    'contains-dairy': 'Contains Dairy',
    'contains-nuts':  'Contains Nuts',
    'vegetarian':     'Vegetarian',
  };

  /* Items with "Hot & Iced" serve indicator in their name */
  const HOT_ICED_PATTERN = /hot\s*[&\/]\s*ic(e|ed)|iced/i;

  const MENU_ITEMS = [
    {id:'brew1', cat:'brewed',    en:'Classic Turkish Coffee',          ar:'قهوة تركية كلاسيكية',       descEn:'Finely ground coffee brewed in copper cezve, served with a dense velvety foam.',              descAr:'قهوة تركية مطحونة ناعماً تُحضر في كنكة نحاسية وتقدم برغوة كثيفة.', price:28, img:'TurkishCoffee.webp',          cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew2', cat:'brewed',    en:'Double Turkish Coffee',           ar:'قهوة تركية مزدوجة',          descEn:'Double the intensity of our classic Turkish coffee — a bolder, deeper flavour.',                descAr:'ضعف كمية القهوة التركية للحصول على نكهة أقوى وأعمق.', price:40, img:'TurkishCoffee.webp',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew3', cat:'brewed',    en:'Ottoman Mastic Coffee',           ar:'قهوة عثمانية بالمستيك',      descEn:'Premium coffee enriched with aromatic mastic resin for a uniquely Ottoman flavour.',            descAr:'قهوة ممتازة مخلوطة بالمستكة العطرية لمنحها طعماً عثمانياً فريداً.', price:28, img:'Ottomanmastica.webp',         cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:'bestseller'},
    {id:'brew4', cat:'brewed',    en:'Hazelnut Turkish Coffee',         ar:'قهوة تركية بالبندق',         descEn:'Classic Turkish coffee blended with rich roasted hazelnut flavour.',                           descAr:'قهوة تركية كلاسيكية مدمجة مع نكهة البندق المحمص الفاخرة.', price:28, img:'Ottomancoffee.webp',          cal:'20 kcal', diet:[],                                                badge:'limited',  outOfStock:true},
    {id:'brew5', cat:'brewed',    en:'Cardamom Turkish Coffee',         ar:'قهوة تركية بالهيل',          descEn:'Classic Turkish coffee infused with aromatic green cardamom.',                                 descAr:'قهوة تركية معطرة بالهيل الأخضر العطري.', price:28, img:'Ottomancardamom.webp',        cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew6', cat:'brewed',    en:'Sahlep',                          ar:'سحلب',                       descEn:'Ancient Anatolian comfort drink made from orchid powder and warm milk.',                       descAr:'شراب دفء الأناضول القديم مصنوع من مسحوق الأوركيد والحليب.', price:38, img:'Sahlep.webp',                cal:'200 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'brew7', cat:'brewed',    en:'Arabic Coffee — Full Dalla',      ar:'قهوة عربية – دلة كاملة',     descEn:'A ceremonial full dalla of premium Arabic coffee, perfect for group sharing.',                  descAr:'دلة كاملة من القهوة العربية الفاخرة، مثالية للتقديم الجماعي.', price:90, img:'Arabiccoffee.webp',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew8', cat:'brewed',    en:'Arabic Coffee — Half Dalla',      ar:'قهوة عربية – نصف دلة',       descEn:'Half-serving of ceremonial Arabic coffee.',                                                    descAr:'نصف دلة من القهوة العربية الأصيلة.', price:55, img:'Arabiccoffee.webp',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew9', cat:'brewed',    en:'Arabic Coffee — Cup',             ar:'قهوة عربية – فنجان',         descEn:'Personal serving of authentic Arabic coffee.',                                                 descAr:'فنجان شخصي من القهوة العربية الأصيلة.', price:35, img:'Arabiccoffee.webp',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'tea1',  cat:'tea',       en:'Turkish Tea',                     ar:'شاي تركي',                   descEn:'Deep amber Rize tea served in a traditional tulip glass.',                                    descAr:'شاي ريزا التركي العميق بلون الكهرمان، يقدم في كأس تقليدي.', price:15, img:'Turkishtea.webp',            cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea2',  cat:'tea',       en:'Turkish Tea Pot',                 ar:'إبريق شاي تركي',             descEn:'A generous pot of premium Rize tea for sharing.',                                             descAr:'إبريق كبير من شاي ريزا التركي الفاخر.', price:45, img:'Teapot.webp',               cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea3',  cat:'tea',       en:'Apple Tea — Hot & Iced',          ar:'شاي التفاح',                 descEn:'Sun-ripened apple essence, served hot or iced.',                                              descAr:'جوهر التفاح الناضج تحت أشعة الشمس، يقدم ساخناً أو مثلجاً.', price:35, img:'Appletea.webp',              cal:'2 kcal',  diet:['vegan'],                                         badge:null, serveMode:'both'},
    {id:'tea4',  cat:'tea',       en:'Mulberry Tea — Hot & Iced',       ar:'شاي التوت',                  descEn:'White mulberry infusion, delicious hot or iced.',                                             descAr:'منقوع التوت الأبيض اللذيذ، ساخن أو مثلج.', price:35, img:'Mulberrytea.webp',           cal:'2 kcal',  diet:['vegan'],                                         badge:null, serveMode:'both'},
    {id:'tea5',  cat:'tea',       en:'Lemon Mint',                      ar:'ليمون بالنعناع',             descEn:'Zesty freshly squeezed lemon and fresh garden mint.',                                         descAr:'ليمون معصور طازجاً ونعناع حديقة عطري.', price:35, img:'Lemonminttea.webp',          cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea6',  cat:'tea',       en:'Pomegranate Tea — Hot & Iced',    ar:'شاي الرمان',                 descEn:'Vibrant pomegranate infusion, served hot or iced.',                                           descAr:'منقوع رمان نابض بالحياة، ساخن أو مثلج.', price:35, img:'Pomegranatetea.webp',        cal:'2 kcal',  diet:['vegan'],                                         badge:null, serveMode:'both'},
    {id:'tea7',  cat:'tea',       en:'Matcha Latte — Iced',             ar:'ماتشا لاتيه',                descEn:'Ceremonial-grade matcha whisked with milk.',                                                  descAr:'ماتشا احتفالية مخفوقة مع حليب.', price:36, img:'Matcha.webp',               cal:'95 kcal', diet:['vegan'],                                         badge:null, serveMode:'iced'},
    {id:'tea13', cat:'tea',       en:'Hibiscus — Hot & Iced',           ar:'كركديه',                     descEn:'Ruby-red hibiscus infusion, refreshing hot or iced.',                                         descAr:'منقوع ياقوتي منعش ساخن أو مثلج.', price:36, img:'Hibiscustea.webp',           cal:'25 kcal', diet:['vegan'],                                         badge:null, serveMode:'both'},
    {id:'tea15', cat:'tea',       en:'Winter Tea',                      ar:'شاي الشتاء',                 descEn:'A warming seasonal spice blend of cinnamon, ginger and clove.',                              descAr:'مزيج توابل شتوية دافئ من القرفة والزنجبيل والقرنفل.', price:38, img:'Wintertea.webp',             cal:'30 kcal', diet:['vegan'],                                         badge:null, serveMode:'hot'},
    {id:'tea16', cat:'tea',       en:'Chamomile',                       ar:'شاي البابونج',               descEn:'Calming golden chamomile blossoms steeped to perfection.',                                   descAr:'بابونج ذهبي مهدئ.', price:36, img:'Chamomiletea.webp',          cal:'0 kcal',  diet:['vegan'],                                         badge:null, serveMode:'hot'},
    {id:'tea17', cat:'tea',       en:'Green Tea',                       ar:'شاي أخضر',                   descEn:'Pure, clean Japanese green tea with a delicate finish.',                                     descAr:'شاي أخضر ياباني نقي ونظيف.', price:36, img:'Greentea.webp',              cal:'0 kcal',  diet:['vegan'],                                         badge:null, serveMode:'hot'},
    {id:'cafe1', cat:'cafe',      en:'Latte — Hot & Iced',              ar:'لاتيه',                      descEn:'Silky microfoam espresso latte, available hot or iced.',                                     descAr:'إسبريسو مع رغوة حليب ناعمة كالحرير.', price:29, img:'Latte.webp',                cal:'170 kcal',diet:['contains-dairy'],                                badge:'bestseller', serveMode:'both'},
    {id:'cafe2', cat:'cafe',      en:'Cappuccino — Hot & Iced',         ar:'كابوتشينو',                  descEn:'Equal thirds of espresso, steamed milk and dense foam.',                                     descAr:'ثلث إسبريسو، ثلث حليب، ثلث رغوة كثيفة.', price:29, img:'Cappuccino.webp',            cal:'150 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe3', cat:'cafe',      en:'Spanish Latte — Hot & Iced',      ar:'لاتيه إسباني',               descEn:'Espresso with sweetened condensed milk for a creamy finish.',                                 descAr:'إسبريسو مع حليب مكثف محلى لمسة كريمية.', price:32, img:'Latte.webp',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe4', cat:'cafe',      en:'Salted Caramel Latte',            ar:'لاتيه كراميل مملح',          descEn:'House-made caramel latte with a touch of sea salt.',                                         descAr:'لاتيه بكراميل منزلي الصنع مع لمسة ملح البحر.', price:32, img:'Latte.webp',                cal:'230 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe5', cat:'cafe',      en:'Vanilla Latte',                   ar:'لاتيه فانيليا',              descEn:'Madagascar bourbon vanilla in a creamy latte.',                                              descAr:'فانيليا بوربون مدغشقر في لاتيه كريمي.', price:32, img:'Latte.webp',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe6', cat:'cafe',      en:'Hazelnut Latte',                  ar:'لاتيه البندق',               descEn:'Roasted hazelnut syrup in a rich latte.',                                                    descAr:'شراب البندق المحمص في لاتيه غني.', price:32, img:'Latte.webp',                cal:'180 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe9', cat:'cafe',      en:'White Mocha',                     ar:'وايت موكا',                  descEn:'White chocolate blended with espresso and milk.',                                            descAr:'شوكولاتة بيضاء ممزوجة بالإسبريسو والحليب.', price:32, img:'Latte.webp',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe10',cat:'cafe',      en:'Mocha',                           ar:'موكا',                       descEn:'Dark chocolate and bold espresso in harmony.',                                               descAr:'شوكولاتة داكنة وإسبريسو قوي.', price:32, img:'Latte.webp',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe11',cat:'cafe',      en:'Flat White',                      ar:'فلات وايت',                  descEn:'Double ristretto with silky velvety milk.',                                                  descAr:'إسبريسو مزدوج مع حليب مخملي ناعم.', price:27, img:'Flatwhite.webp',             cal:'140 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'cafe14',cat:'cafe',      en:'Espresso Macchiato',              ar:'ماكياتو',                    descEn:'Espresso marked with a delicate touch of milk foam.',                                        descAr:'إسبريسو مع لمسة من رغوة الحليب.', price:24, img:'Latte.webp',                cal:'60 kcal', diet:['contains-dairy'],                                badge:null, serveMode:'hot'},
    {id:'cafe15',cat:'cafe',      en:'Espresso Single',                 ar:'إسبريسو مفرد',               descEn:'Pure concentrated espresso shot.',                                                           descAr:'جرعة إسبريسو مركزة نقية.', price:18, img:'Espresso.webp',              cal:'3 kcal',  diet:['vegan'],                                         badge:null, serveMode:'hot'},
    {id:'cafe17',cat:'cafe',      en:'Americano',                       ar:'أمريكانو',                   descEn:'Espresso pulled long with hot water for a clean, smooth cup.',                               descAr:'إسبريسو ممتد بالماء الساخن.', price:21, img:'Americano.webp',             cal:'5 kcal',  diet:['vegan'],                                         badge:null, serveMode:'both'},
    {id:'cafe18',cat:'cafe',      en:'Hot Chocolate',                   ar:'هوت شوكولاتة',               descEn:'Artisanal dark cocoa dissolved in warm steamed milk.',                                       descAr:'كاكاو داكن حرفي مذاب في الحليب الدافئ.', price:36, img:'Latte.webp',                cal:'360 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'hot'},
    {id:'cafe19',cat:'cafe',      en:'Piccolo Latte',                   ar:'بيكولو لاتيه',               descEn:'A small, intense latte with a ristretto shot and silky milk.',                               descAr:'لاتيه صغير وقوي بجرعة ريستريتو.', price:26, img:'Piccololatte.webp',        cal:'110 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'hot'},
    {id:'cafe20',cat:'cafe',      en:'Pistachio Latte',                 ar:'لاتيه الفستق',               descEn:'Creamy latte infused with real pistachio butter for a nutty indulgence.',                    descAr:'لاتيه كريمي مع زبدة الفستق الحقيقية.', price:34, img:'Pistachiolatte.webp',       cal:'190 kcal',diet:['contains-dairy','contains-nuts'],               badge:null, serveMode:'both'},
    {id:'cafe21',cat:'cafe',      en:'Tiramisu Latte',                  ar:'لاتيه تيراميسو',             descEn:'Dessert in a cup — mascarpone, espresso and a cocoa dusting.',                               descAr:'حلى في فنجان: ماسكاربوني، إسبريسو وكاكاو.', price:34, img:'Tiramisulatte.webp',        cal:'190 kcal',diet:['contains-dairy'],                                badge:null, serveMode:'both'},
    {id:'spec1', cat:'specialty', en:'V60 Pour Over',                   ar:'V60 بور أوفر',               descEn:'Single origin specialty beans brewed by hand with the V60 pour-over method.',                 descAr:'حبوب قهوة مختصة تُحضر بالتقطير اليدوي.', price:33, img:'V60.webp',                  cal:'2 kcal',  diet:['vegan'],                                         badge:'signature'},
    {id:'spec2', cat:'specialty', en:'Ice Drip',                        ar:'آيس دريب',                   descEn:'8-hour cold drip extraction — ultra-clear, ultra-delicate.',                                 descAr:'استخلاص بطيء بالتنقيط على الثلج لمدة 8 ساعات.', price:35, img:'Icedrip.webp',               cal:'2 kcal',  diet:['vegan'],                                         badge:'signature', serveMode:'iced'},
    {id:'spec3', cat:'specialty', en:'Cold Brew',                       ar:'كولد برو',                   descEn:'18+ hour cold steep for an ultra-smooth, low-acid coffee concentrate.',                     descAr:'نقع بارد لأكثر من 18 ساعة لقهوة ناعمة كالحرير.', price:37, img:'Coldbrew.webp',              cal:'2 kcal',  diet:['vegan'],                                         badge:'bestseller', serveMode:'iced'},
    {id:'ref16', cat:'refreshers',en:'Lemonade',                        ar:'ليمونادة',                   descEn:'Zesty freshly squeezed lemon drink, chilled and refreshing.',                                descAr:'مشروب ليمون منعش.', price:37, img:'Lemonade.webp',               cal:'120 kcal',diet:[],                                                 badge:null, serveMode:'iced'},
    {id:'ref15', cat:'refreshers',en:'Orange Juice',                    ar:'عصير برتقال',                descEn:'Freshly squeezed orange juice, nothing added.',                                              descAr:'عصير برتقال طازج معصور.', price:37, img:'Orangejuice.webp',            cal:'110 kcal',diet:[],                                                 badge:null},
    {id:'ref10', cat:'refreshers',en:'Cooling Breeze',                  ar:'نسيم منعش',                  descEn:'A chilled blend of citrus and refreshing herbs.',                                            descAr:'مزيج مثلج من الحمضيات والأعشاب المنعشة.', price:45, img:'Coolingbreeze.webp',         cal:'150 kcal',diet:[],                                                 badge:null, serveMode:'iced'},
    {id:'ref3',  cat:'refreshers',en:'Orange Earl Grey',                ar:'برتقال إيرل جراي',           descEn:'Citrus and bergamot duet in an Earl Grey base.',                                             descAr:'دوئية البرغموت والحمضيات في شاي إيرل جراي.', price:47, img:'Orangeearlygreytea.webp',     cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'ref6',  cat:'refreshers',en:'Blue Lagoon',                     ar:'موهيتو توت أزرق',            descEn:'Wild blueberries with fresh mint and a squeeze of lemon.',                                  descAr:'توت بري مع نعناع طازج ولمسة ليمون.', price:38, img:'Bluelagoon.webp',            cal:'150 kcal',diet:[],                                                 badge:null, serveMode:'iced'},
    {id:'ref7',  cat:'refreshers',en:'Strawberry Mojito',               ar:'موهيتو فراولة',              descEn:'Fresh strawberries muddled with mint and lime.',                                             descAr:'فراولة طازجة مدقوقة مع النعناع.', price:42, img:'Strawberrymojito.webp',       cal:'170 kcal',diet:[],                                                 badge:null, serveMode:'iced'},
    {id:'ref13a',cat:'refreshers',en:'Still Water (Small)',              ar:'مياه عادية (صغير)',          descEn:'Pure still water, small.',                                                                   descAr:'مياه نقية طبيعية، صغيرة.', price:11, img:'Stillwater.webp',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref14', cat:'refreshers',en:'Still Water (Large)',              ar:'مياه عادية (كبير)',          descEn:'Pure still water, large.',                                                                   descAr:'مياه نقية طبيعية، كبيرة.', price:21, img:'Stillwater.webp',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref12a',cat:'refreshers',en:'Sparkling Water',                 ar:'مياه غازية',                 descEn:'Naturally carbonated sparkling water.',                                                      descAr:'مياه غازية طبيعية.', price:23, img:'Sparklingwater.webp',         cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'bak1',  cat:'baklava',   en:'Baklava Mix',                     ar:'بقلاوة مشكلة',               descEn:'A stunning assortment of Ottoman baklava filled with premium nuts.',                         descAr:'تشكيلة مذهلة من البقلاوة العثمانية المحشوة بالمكسرات.', price:65, img:'Mixbaklava.webp',            cal:'450 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak2',  cat:'baklava',   en:'Carrot Slice Baklava',            ar:'بقلاوة جزر',                 descEn:'Traditional Ottoman carrot-shaped baklava filled with premium pistachios.',                   descAr:'بقلاوة جزر عثمانية تقليدية محشوة بالمكسرات.', price:45, img:'Carrotslice.webp',           cal:'420 kcal',diet:['contains-nuts'],                                 badge:'signature'},
    {id:'bak3',  cat:'baklava',   en:'Carrot Baklava with Ice Cream',   ar:'بقلاوة جزر مع آيس كريم',    descEn:'Warm carrot baklava served with a scoop of vanilla ice cream.',                               descAr:'بقلاوة جزر دافئة تقدم مع آيس كريم.', price:55, img:'Carrotslicewithicecream.webp',cal:'620 kcal',diet:['contains-nuts','contains-dairy'],               badge:'bestseller'},
    {id:'bak4',  cat:'baklava',   en:'Trio Baklava',                    ar:'تريو بقلاوة',                descEn:'Three distinct baklava styles on one plate.',                                                descAr:'ثلاث قطع من البقلاوة بأشكال مختلفة.', price:45, img:'Triobaklava.webp',            cal:'480 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak13', cat:'baklava',   en:'Kunafa',                          ar:'كنافة',                      descEn:'Shredded kataifi pastry with rich cream cheese, soaked in blossom syrup.',                  descAr:'كنافة شعر مقرمشة محشوة بالجبن الكريمي.', price:45, img:'Kunafa.webp',               cal:'520 kcal',diet:['contains-dairy'],                                badge:'signature'},
    {id:'bak14', cat:'baklava',   en:'Brownies',                        ar:'براونيز',                    descEn:'Dense, fudge-rich dark chocolate brownies.',                                                 descAr:'براونيز شوكولاتة داكنة غنية وفادحة.', price:55, img:'Brownies.webp',              cal:'380 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak15', cat:'baklava',   en:'Honey Cake',                      ar:'كيكة العسل',                 descEn:'Soft layered honey cake with a rich cream filling.',                                         descAr:'كيكة عسل طرية بطبقات.', price:45, img:'Honeycake.webp',              cal:'520 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak16', cat:'baklava',   en:'Tiramisu',                        ar:'تيراميسو',                   descEn:'Classic Italian tiramisu with layers of ladyfinger biscuit and cream.',                     descAr:'تيراميسو كلاسيكي بطبقات البسكويت والكريمة.', price:45, img:'Tiramisu.webp',               cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak17', cat:'baklava',   en:'Mango Cake',                      ar:'كيكة المانجو',               descEn:'Light sponge cake layered with fresh mango pieces and cream.',                               descAr:'كيك إسفنجي خفيف بقطع المانجو الطازجة.', price:45, img:'Mangocake.webp',              cal:'450 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak18', cat:'baklava',   en:'Pistachio Cake',                  ar:'كيكة الفستق',                descEn:'Rich pistachio cake with layers of pistachio cream.',                                        descAr:'كيك فستق غني بطبقات كريمة الفستق.', price:45, img:'Pistachiocake.webp',         cal:'530 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'bak19', cat:'baklava',   en:'San Sebastian Cheesecake',        ar:'تشيزكيك سان سيباستيان',      descEn:'Burnt Basque cheesecake — caramelised top, creamy centre.',                                  descAr:'تشيز كيك باسك محروق الوجه، طري من الداخل.', price:45, img:'Sansebastian.webp',           cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak20', cat:'baklava',   en:'Fanzuella Sweet',                 ar:'فانزويلا سويت',              descEn:'Sweet creamy dessert with a touch of premium nuts.',                                         descAr:'حلى كريمي حلو مع لمسة مكسرات.', price:45, img:'Fanzuella.webp',              cal:'350 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'bak21', cat:'baklava',   en:'Trileche',                        ar:'تريليتشي',                   descEn:'Soft sponge soaked in three kinds of milk — a silky, indulgent dessert.',                   descAr:'كيك إسفنجي منقوع بثلاثة أنواع حليب.', price:45, img:'Trileche.webp',               cal:'400 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak22', cat:'baklava',   en:'Red Velvet',                      ar:'ريد فيلفيت',                 descEn:'Soft, moist red velvet sponge layered with creamy frosting.',                                descAr:'كيك ريد فيلفيت ناعم مع كريمة.', price:45, img:'Redvelvet.webp',               cal:'420 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak23', cat:'baklava',   en:'Chocolate Mousse Cake',           ar:'كيك موس شوكولاتة',           descEn:'Light and airy chocolate mousse with a rich cocoa finish.',                                  descAr:'كيك موس شوكولاتة خفيف وغني.', price:45, img:'Moussecake.webp',               cal:'380 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak24', cat:'baklava',   en:'Dark Forest Cake',                ar:'دارك فورست',                 descEn:'Chocolate sponge layered with cherries and cream.',                                          descAr:'كيك شوكولاتة مع كرز وكريمة.', price:45, img:'Darkforest.webp',               cal:'450 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak25', cat:'baklava',   en:'Dark Chocolate Cake',             ar:'شوكولاتة داكنة',             descEn:'Rich dark chocolate layered cake with intense cocoa flavor.',                                descAr:'كيك شوكولاتة داكنة غني.', price:45, img:'Darkchocolate.webp',             cal:'430 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak26', cat:'baklava',   en:'Blueberry Cake',                  ar:'كيك التوت الأزرق',           descEn:'Moist blueberry cake bursting with fresh berry flavor.',                                    descAr:'كيك توت أزرق طري بنكهة فاكهية غنية.', price:45, img:'BlueberryCake.webp',           cal:'420 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'snack01',cat:'snacks',   en:'Turkish Ice Cream',               ar:'آيس كريم تركي',              descEn:'Classic stretchy dondurma ice cream — served with a theatrical flourish.',                  descAr:'دوندورما تركية كلاسيكية قابلة للمط.', price:27, img:'Icecreamcup.webp',            cal:'210 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'snack1', cat:'snacks',   en:'Nuts Stand — Tall',               ar:'مكسرات – ستاند كبير',        descEn:'Premium roasted nuts presented in a tall display stand.',                                    descAr:'مكسرات فاخرة محمصة تقدم في ستاند كبير.', price:99, img:'Tallnuts.webp',               cal:'300 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'snack2', cat:'snacks',   en:'Nuts Stand — Small',              ar:'مكسرات – ستاند صغير',        descEn:'Curated premium roasted nuts in a small display stand.',                                    descAr:'مكسرات فاخرة محمصة تقدم في ستاند صغير.', price:60, img:'Smallnuts.webp',              cal:'180 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'cro1',  cat:'croissant', en:'Plain Butter Croissant',          ar:'كرواسون زبدة',               descEn:'Classic Parisian all-butter croissant, flaky and golden.',                                   descAr:'كرواسون زبدة باريسي كلاسيكي.', price:20, img:'Plainbuttercroissant.webp',  cal:'320 kcal',diet:['vegetarian'],                                    badge:'signature'},
    {id:'cro2',  cat:'croissant', en:'Cheese Croissant',                ar:'كرواسون جبن',                descEn:'Flaky buttery croissant filled with melted cheese.',                                         descAr:'كرواسون زبدة محشو بالجبنة.', price:20, img:'Cheesecroissant.webp',        cal:'360 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro3',  cat:'croissant', en:'Chocolate Croissant',             ar:'كرواسون شوكولاتة',           descEn:'Buttery laminated pastry filled with dark chocolate.',                                       descAr:'كرواسون زبدة محشو بالشوكولاتة.', price:20, img:'Chocolatecroissant.webp',      cal:'380 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro4',  cat:'croissant', en:'Almond Croissant',                ar:'كرواسون لوز',                descEn:'Croissant filled with almond frangipane cream and topped with flaked almonds.',             descAr:'كرواسون محشو بكريمة اللوز.', price:20, img:'Almondcroissant.webp',        cal:'400 kcal',diet:['vegetarian','contains-nuts'],                   badge:null},
    {id:'cro5',  cat:'croissant', en:'Cinnamon Danish',                 ar:'دانش قرفة',                  descEn:'Cinnamon sugar spiral danish, soft and fragrant.',                                          descAr:'دانش قرفة وسكر بشكل حلزوني.', price:20, img:'Cinnamondanish.webp',        cal:'390 kcal',diet:['vegetarian'],                                    badge:null},
  ];

  const ITEM_MAP = Object.fromEntries(MENU_ITEMS.map(i => [i.id, i]));

  /* ============================================================
     §2  I18N
  ============================================================ */
  const I18N = {
    en: {
      tagline:'Luxury in Every Sip of Tradition', eyebrow:'Est. Ottoman Heritage',
      viewMenu:'View Menu', backToHome:'Home',
      menuLabel:'Selections', spotlightLabel:'Today\'s Picks',
      searchPlaceholder:'Search flavours…', resultSingular:'item', resultPlural:'items',
      emptyTitle:'Nothing found', emptySub:'Try a different search or browse all categories.',
      langLabel:'Switch to Arabic', themeLight:'Switch to light mode', themeDark:'Switch to dark mode',
      qrTitle:'Scan to Browse', qrDesc:'Point your camera at the code below for the full Turkiana menu experience.',
      closeModal:'Close', fabLabel:'View Menu', footerTagline:'Luxury in Every Sip of Tradition',
      itemCloseLabel:'Close', priceLabel:'Price:',
    },
    ar: {
      tagline:'الفخامة في كل رشفة من التراث', eyebrow:'تراث عثماني أصيل',
      viewMenu:'عرض القائمة', backToHome:'الرئيسية',
      menuLabel:'التشكيلة', spotlightLabel:'اختيارات اليوم',
      searchPlaceholder:'ابحث عن النكهات…', resultSingular:'صنف', resultPlural:'أصناف',
      emptyTitle:'لا توجد نتائج', emptySub:'جرّب بحثاً مختلفاً أو تصفح جميع التصنيفات.',
      langLabel:'التبديل إلى الإنجليزية', themeLight:'التبديل إلى الوضع الفاتح', themeDark:'التبديل إلى الوضع الداكن',
      qrTitle:'امسح لتصفح', qrDesc:'وجّه الكاميرا نحو الرمز أدناه للوصول إلى قائمة تركيانا.',
      closeModal:'إغلاق', fabLabel:'عرض القائمة', footerTagline:'الفخامة في كل رشفة من التراث',
      itemCloseLabel:'إغلاق', priceLabel:'السعر:',
    },
  };

  /* ============================================================
     §3  STATE
  ============================================================ */
  const state = {
    lang:      localStorage.getItem('tk-lang') || 'en',
    dark:      (() => {
      const s = localStorage.getItem('tk-dark');
      return s !== null ? s === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    })(),
    category:  'all',
    search:    '',
    dietFilter: [],
    priceRange: 'all',
  };

  const hash = window.location.hash;
  if (hash.startsWith('#category=')) {
    const c = hash.slice('#category='.length);
    if (CATEGORIES.some(x => x.key === c)) state.category = c;
  }

  function setState(partial) {
    const prev = { ...state };
    Object.assign(state, partial);
    if ('lang' in partial && partial.lang !== prev.lang) applyLanguage();
    if ('dark' in partial && partial.dark !== prev.dark) applyTheme();
    if ('category' in partial || 'search' in partial || 'dietFilter' in partial || 'priceRange' in partial) applyFilter();
    if ('lang'  in partial) localStorage.setItem('tk-lang', state.lang);
    if ('dark'  in partial) localStorage.setItem('tk-dark', state.dark);
    if ('category' in partial) {
      history.replaceState(null, '', state.category === 'all'
        ? window.location.pathname
        : '#category=' + state.category);
    }
  }

  /* ============================================================
     §4  SAFE DOM HELPER
  ============================================================ */
  function q(id) { return document.getElementById(id); }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

  /* ============================================================
     §5  CACHED DOM REFS
  ============================================================ */
  const $ = {};
  function cacheDOM() {
    const ids = [
      'cursor','cursorRing','mainNav','siteHeader','heroTitle','heroTagline',
      'heroEyebrow','heroBg','steamWrap','landing','menuPage','navBackBtn',
      'viewMenuBtn','viewMenuLabel','tickerTrack','menuLabel','categoryScroller',
      'searchInput','searchClear','resultCount','menuGrid','emptyState',
      'emptyTitle','emptySub','emptyReset','liveRegion','langToggle',
      'themeToggle','themeIcon','qrBtn','herQrBtn','qrModal','closeModal',
      'closeModalLabel','qrCloseX','itemModal','itemImgWrapper','itemModalTitle',
      'itemModalPrice','itemModalDesc','itemModalCal','itemModalDiet',
      'itemModalCat','itemModalBadge','itemCloseModal','itemCloseLabel',
      'itemCloseX','mobileFab','fabLabel','footerTagline','scrollTopBtn',
      'spotlightGrid','spotlightLabel','priceSelect','priceLabel',
      'hoursTable','viewGrid','viewList',
    ];
    ids.forEach(id => { $[id] = q(id); });
    $.html = document.documentElement;
  }

  /* ============================================================
     §6  RENDERING
  ============================================================ */
  function serveBadgeHTML(item) {
    if (!item.serveMode) return '';
    if (item.serveMode === 'both')
      return `<span class="card-serve-badge" aria-label="Available hot or iced">🔥 Hot · ❄ Iced</span>`;
    if (item.serveMode === 'hot')
      return `<span class="card-serve-badge hot" aria-label="Served hot">🔥 Hot</span>`;
    if (item.serveMode === 'iced')
      return `<span class="card-serve-badge iced" aria-label="Served iced">❄ Iced</span>`;
    return '';
  }

  function buildCardHTML(item) {
    const isAr = state.lang === 'ar';
    const name  = isAr ? item.ar : item.en;
    const desc  = isAr ? (item.descAr || item.descEn) : item.descEn;
    const badge = item.badge ? `<span class="card-badge">${BADGE_LABELS[item.badge]}</span>` : '';
    const catLabel = CATEGORIES.find(c => c.key === item.cat);
    const catName  = isAr ? catLabel?.ar : catLabel?.en;
    const isFeatured = item.badge === 'bestseller' || item.badge === 'signature';
    const dietDots = item.diet.map(d =>
      `<span class="diet-dot" data-diet="${d}" title="${DIET_LABELS[d] || d}" aria-label="${DIET_LABELS[d] || d}"></span>`
    ).join('');

    return `
      <li
        class="menu-card"
        data-id="${item.id}"
        data-cat="${item.cat}"
        data-featured="${isFeatured}"
        ${item.outOfStock ? 'data-stock="out"' : ''}
        tabindex="0"
        role="button"
        aria-label="${name}, ${item.price} ${CURRENCY}${item.outOfStock ? ', currently unavailable' : ''}"
      >
        <div class="card-thumb">
          <img
            data-src="${IMG_BASE}${item.img}"
            alt="${name}"
            width="400"
            height="300"
            decoding="async"
          >
          <div class="card-img-fallback" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="32" height="32" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>${name}</span>
          </div>
          <div class="card-overlay" aria-hidden="true">
            <p class="card-overlay-desc">${desc}</p>
            <span class="card-overlay-price">${item.price} ${CURRENCY}</span>
          </div>
          ${badge}
          ${serveBadgeHTML(item)}
        </div>
        <div class="card-body">
          <p class="card-category" aria-hidden="true">${catName ?? ''}</p>
          <h3 class="card-name" data-field="name">${name}</h3>
          <p class="card-desc" data-field="desc">${desc}</p>
          <div class="card-footer">
            <span class="card-price">${item.price} ${CURRENCY}</span>
            <div class="card-meta">
              <span class="card-cal">${item.cal}</span>
              <div class="card-diet-icons" aria-label="Dietary information">${dietDots}</div>
            </div>
          </div>
        </div>
      </li>`;
  }

  function buildAllCards() {
    if (!$.menuGrid) return;
    const frag = document.createDocumentFragment();
    const tmp  = document.createElement('div');
    MENU_ITEMS.forEach(item => {
      tmp.innerHTML = buildCardHTML(item);
      frag.appendChild(tmp.firstElementChild);
    });
    $.menuGrid.innerHTML = '';
    $.menuGrid.appendChild(frag);
    $.menuGrid.classList.remove('is-loading');
    $.menuGrid.removeAttribute('aria-busy');
    initImageObserver();
  }

  function buildSpotlight() {
    if (!$.spotlightGrid) return;
    const featured = MENU_ITEMS.filter(i => i.badge && !i.outOfStock).slice(0, 3);
    const isAr = state.lang === 'ar';
    $.spotlightGrid.innerHTML = featured.map(item => `
      <li class="spotlight-card" tabindex="0" role="button"
          aria-label="${isAr ? item.ar : item.en}"
          data-id="${item.id}">
        <img data-src="${IMG_BASE}${item.img}" alt="${isAr ? item.ar : item.en}" width="400" height="300" decoding="async">
        <div class="spotlight-card-overlay">
          <span class="spotlight-badge">${BADGE_LABELS[item.badge]}</span>
          <p class="spotlight-name">${isAr ? item.ar : item.en}</p>
          <span class="spotlight-price">${item.price} ${CURRENCY}</span>
        </div>
      </li>`
    ).join('');
    /* observe spotlight images */
    $.spotlightGrid.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver && imageObserver.observe(img);
    });
    /* click → open item modal */
    $.spotlightGrid.addEventListener('click', e => {
      const card = e.target.closest('[data-id]');
      if (card) openItemModal(card.dataset.id, card);
    });
    $.spotlightGrid.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('[data-id]');
      if (card) { e.preventDefault(); openItemModal(card.dataset.id, card); }
    });
  }

  function buildCategoryPills() {
    if (!$.categoryScroller) return;
    const isAr = state.lang === 'ar';
    const frag = document.createDocumentFragment();
    const tmp  = document.createElement('div');
    CATEGORIES.forEach(cat => {
      const active = cat.key === state.category;
      tmp.innerHTML = `<button class="cat-pill${active ? ' active' : ''}" data-cat="${cat.key}" aria-pressed="${active}" type="button">${isAr ? cat.ar : cat.en}</button>`;
      frag.appendChild(tmp.firstElementChild);
    });
    $.categoryScroller.innerHTML = '';
    $.categoryScroller.appendChild(frag);
  }

  function buildTicker() {
    if (!$.tickerTrack) return;
    const items  = MENU_ITEMS.filter(i => i.badge);
    const source = items.length > 0 ? items : MENU_ITEMS.slice(0, 6);
    const isAr   = state.lang === 'ar';
    const labels = source.map(i => `
      <span class="ticker-item">
        <span class="ticker-dot" aria-hidden="true"></span>
        ${isAr ? i.ar : i.en}
        <span class="ticker-dot" aria-hidden="true"></span>
        ${i.price} ${CURRENCY}
      </span>`).join('');
    $.tickerTrack.innerHTML = labels + labels;
  }

  function updateCardTexts() {
    if (!$.menuGrid) return;
    const isAr   = state.lang === 'ar';
    const catMap  = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));
    $.menuGrid.querySelectorAll('.menu-card').forEach(card => {
      const item = ITEM_MAP[card.dataset.id];
      if (!item) return;
      const newName = isAr ? item.ar : item.en;
      const newDesc = isAr ? (item.descAr || item.descEn) : item.descEn;
      const nameEl = card.querySelector('[data-field="name"]');
      const descEl = card.querySelector('[data-field="desc"]');
      if (nameEl) nameEl.textContent = newName;
      if (descEl) descEl.textContent = newDesc;
      const overlayDesc = card.querySelector('.card-overlay-desc');
      if (overlayDesc) overlayDesc.textContent = newDesc;
      const catEl = card.querySelector('.card-category');
      if (catEl) { const cd = catMap[item.cat]; catEl.textContent = isAr ? cd?.ar : cd?.en; }
      card.setAttribute('aria-label', `${newName}, ${item.price} ${CURRENCY}${item.outOfStock ? ', currently unavailable' : ''}`);
    });
  }

  /* ============================================================
     §7  INTERSECTION OBSERVER — Lazy Images
  ============================================================ */
  let imageObserver = null;

  function initImageObserver() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: load all immediately */
      document.querySelectorAll('img[data-src]').forEach(loadImage);
      return;
    }
    if (imageObserver) imageObserver.disconnect();

    imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  function loadImage(img) {
    if (!img || !img.dataset.src) return;
    const thumb = img.closest('.card-thumb, .spotlight-card');
    img.src = img.dataset.src;
    delete img.dataset.src;

    img.onload = () => {
      img.classList.add('is-loaded');
    };
    img.onerror = () => {
      if (thumb) thumb.classList.add('error');
      img.alt = img.alt || 'Image unavailable';
    };
    /* If already cached/complete */
    if (img.complete && img.naturalWidth) {
      img.classList.add('is-loaded');
    }
  }

  /* ============================================================
     §8  FILTER
  ============================================================ */
  let filterRaf = null;

  function applyFilter() {
    if (filterRaf) cancelAnimationFrame(filterRaf);
    filterRaf = requestAnimationFrame(_doFilter);
  }

  function _doFilter() {
    filterRaf = null;
    const term    = state.search.toLowerCase().trim();
    const cat     = state.category;
    const isAr    = state.lang === 'ar';
    const diets   = state.dietFilter;
    const pRange  = state.priceRange;
    let [pMin, pMax] = [0, Infinity];
    if (pRange !== 'all') {
      const parts = pRange.split('-');
      pMin = Number(parts[0]);
      pMax = Number(parts[1]) ?? Infinity;
    }

    if (!$.menuGrid) return;
    const cards = $.menuGrid.querySelectorAll('.menu-card');
    let visible = 0;

    cards.forEach(card => {
      const item = ITEM_MAP[card.dataset.id];
      if (!item) return;
      const textField = isAr
        ? (item.ar + ' ' + (item.descAr || item.descEn))
        : (item.en + ' ' + item.descEn);
      const catMatch   = cat === 'all' || item.cat === cat;
      const termMatch  = !term || textField.toLowerCase().includes(term);
      const dietMatch  = diets.length === 0 || diets.every(d => item.diet.includes(d));
      const priceMatch = item.price >= pMin && item.price <= pMax;
      const show = catMatch && termMatch && dietMatch && priceMatch;
      card.dataset.hidden = show ? 'false' : 'true';
      if (show) visible++;
    });

    const t = I18N[state.lang];
    if ($.emptyState) {
      $.emptyState.hidden = visible > 0;
    }
    const countText = `${visible} ${visible === 1 ? t.resultSingular : t.resultPlural}`;
    if ($.resultCount) $.resultCount.textContent = countText;
    if ($.searchClear) $.searchClear.hidden = state.search.length === 0;

    clearTimeout(applyFilter._liveT);
    applyFilter._liveT = setTimeout(() => {
      if ($.liveRegion) $.liveRegion.textContent = countText;
    }, 600);
  }
  applyFilter._liveT = null;

  /* ============================================================
     §9  LANGUAGE
  ============================================================ */
  function applyLanguage() {
    const lang = state.lang;
    const isAr = lang === 'ar';
    const t    = I18N[lang];
    $.html.lang = lang;
    $.html.dir  = isAr ? 'rtl' : 'ltr';
    if ($.heroTagline)   $.heroTagline.textContent   = t.tagline;
    if ($.heroEyebrow)   $.heroEyebrow.innerHTML     = `<span class="eyebrow-line" aria-hidden="true"></span>${t.eyebrow}<span class="eyebrow-line" aria-hidden="true"></span>`;
    if ($.viewMenuLabel) $.viewMenuLabel.textContent  = t.viewMenu;
    if ($.footerTagline) $.footerTagline.textContent  = t.footerTagline;
    if ($.langToggle)    $.langToggle.setAttribute('aria-label', t.langLabel);
    if ($.menuLabel)     $.menuLabel.textContent      = t.menuLabel;
    if ($.spotlightLabel)$.spotlightLabel.textContent = t.spotlightLabel;
    if ($.searchInput)   $.searchInput.placeholder    = t.searchPlaceholder;
    if ($.emptyTitle)    $.emptyTitle.textContent     = t.emptyTitle;
    if ($.emptySub)      $.emptySub.textContent       = t.emptySub;
    if ($.closeModalLabel) $.closeModalLabel.textContent = t.closeModal;
    if ($.itemCloseLabel)  $.itemCloseLabel.textContent  = t.itemCloseLabel;
    if ($.priceLabel)    $.priceLabel.textContent     = t.priceLabel;

    const menuPageEl = $.menuPage;
    if ($.fabLabel) {
      $.fabLabel.textContent = (menuPageEl && !menuPageEl.classList.contains('hidden'))
        ? t.backToHome : t.viewMenu;
    }
    updateCardTexts();
    buildCategoryPills();
    buildTicker();
    buildSpotlight();
    applyFilter();
    bindCategoryEvents(); /* rebind after pills rebuild */
  }

  /* ============================================================
     §10  THEME
  ============================================================ */
  function applyTheme() {
    const isDark = state.dark;
    $.html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const t = I18N[state.lang];
    if ($.themeToggle) $.themeToggle.setAttribute('aria-label', isDark ? t.themeLight : t.themeDark);
    if ($.themeIcon) {
      $.themeIcon.innerHTML = isDark
        ? `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`
        : `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    }
  }

  /* ============================================================
     §11  PAGE SWITCHING
  ============================================================ */
  function showMenuPage() {
    if (!$.menuPage) return;
    if ($.landing) $.landing.style.display = 'none';
    $.menuPage.classList.remove('hidden');
    document.body.classList.add('menu-page-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if ($.fabLabel) $.fabLabel.textContent = I18N[state.lang].backToHome;
    document.title = 'Menu — Turkiana · Turkish Café & Desserts';
    /* Trigger image observer on newly visible cards */
    setTimeout(() => {
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver && imageObserver.observe(img);
      });
      initObservers();
    }, 50);
    highlightTodayHours();
  }

  function showLandingPage() {
    if (!$.menuPage) return;
    $.menuPage.classList.add('hidden');
    if ($.landing) $.landing.style.display = 'block';
    document.body.classList.remove('menu-page-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if ($.fabLabel) $.fabLabel.textContent = I18N[state.lang].viewMenu;
    document.title = 'Turkiana · Turkish Café & Desserts — Doha';
  }

  /* Opening hours: highlight today's row */
  function highlightTodayHours() {
    const dayNames = ['sun','mon','tue','wed','thu','fri','sat'];
    const today    = dayNames[new Date().getDay()];
    if (!$.hoursTable) return;
    $.hoursTable.querySelectorAll('.hours-row').forEach(row => {
      const days = (row.dataset.days || '').split(',');
      row.classList.toggle('today', days.includes(today));
    });
  }

  /* ============================================================
     §12  HERO IMAGE
  ============================================================ */
  function initHero() {
    if (!$.heroBg) return;
    const imgUrl = `${IMG_BASE}Carrotslice.webp`;
    const probe  = new Image();
    probe.onload  = () => {
      $.heroBg.style.backgroundImage = `url('${imgUrl}')`;
      $.heroBg.classList.add('loaded');
    };
    probe.onerror = () => $.heroBg.classList.add('loaded');
    probe.src = imgUrl;
  }

  /* ============================================================
     §13  HERO TITLE CHAR REVEAL
  ============================================================ */
  function initHeroTitle() {
    if (!$.heroTitle) return;
    const word = 'TURKIANA';
    $.heroTitle.setAttribute('aria-label', word);
    $.heroTitle.innerHTML = word.split('').map((ch, i) =>
      `<span class="char" style="animation-delay:${0.5 + i * 0.08}s" aria-hidden="true">${ch}</span>`
    ).join('');
  }

  /* ============================================================
     §14  STEAM PARTICLES (reduced-motion safe via CSS)
  ============================================================ */
  function initSteam() {
    if (!$.steamWrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const N = 6;
    for (let i = 0; i < N; i++) {
      const p = document.createElement('div');
      p.className = 'steam-particle';
      const x = 30 + Math.random() * 40;
      p.style.cssText = `
        left:${x}%;
        height:${60 + Math.random() * 80}px;
        --dur:${5 + Math.random() * 5}s;
        --delay:${Math.random() * 6}s;
        --ease:${Math.random() > 0.5 ? 'ease-in' : 'ease-in-out'};
      `;
      $.steamWrap.appendChild(p);
    }
  }

  /* ============================================================
     §15  NAV SCROLL EFFECT
  ============================================================ */
  function initNavScroll() {
    const header = q('siteHeader');
    if (!header) return;
    let lastY   = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle('nav-scrolled', y > 60);
        header.classList.toggle('nav-hidden',   y > lastY + 80 && y > 300);
        if (y < lastY + 10 || y < 200) header.classList.remove('nav-hidden');
        lastY   = y;
        ticking = false;
        /* Scroll-to-top */
        if ($.scrollTopBtn) $.scrollTopBtn.classList.toggle('visible', y > 400);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     §16  INTERSECTION OBSERVER — Reveals & Stagger
  ============================================================ */
  function initObservers() {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed', 'is-visible');
        obs.unobserve(e.target);
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

    if (!$.menuGrid) return;
    $.menuGrid.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${Math.min(i * 30, 300)}ms`);
      obs.observe(card);
    });
  }

  /* ============================================================
     §17  CARD TILT (desktop only)
  ============================================================ */
  function initCardTilt() {
    if (!$.menuGrid) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    $.menuGrid.addEventListener('mousemove', e => {
      const thumb = e.target.closest('.card-thumb');
      if (!thumb) return;
      const r = thumb.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  8;
      thumb.style.willChange = 'transform';
      thumb.style.transform  = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      thumb.style.transition = 'transform 0.08s ease';
    });

    $.menuGrid.addEventListener('mouseleave', () => {
      $.menuGrid.querySelectorAll('.card-thumb').forEach(t => {
        t.style.transform = t.style.transition = t.style.willChange = '';
      });
    }, true);
  }

  /* ============================================================
     §18  CUSTOM CURSOR
  ============================================================ */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(prefers-contrast: more)').matches) return;
    if (!$.cursor || !$.cursorRing) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      $.cursor.style.left = mx + 'px';
      $.cursor.style.top  = my + 'px';
    });
    (function tick() {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      $.cursorRing.style.left = rx + 'px';
      $.cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    })();
    document.body.classList.add('cursor-ready');
    document.addEventListener('mouseover', e => {
      const interactive = e.target.closest('button, a, input, select, .menu-card, .cat-pill, .spotlight-card');
      $.cursor.classList.toggle('is-hovering',    !!interactive);
      $.cursorRing.classList.toggle('is-hovering', !!interactive);
    });
  }

  /* ============================================================
     §19  MODAL — FOCUS TRAP + SWIPE TO DISMISS
  ============================================================ */
  const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let _qrOpener   = null;
  let _itemOpener = null;

  /* ── Focus trap ── */
  function trapFocus(modal) {
    const els = Array.from(modal.querySelectorAll(FOCUSABLE)).filter(el =>
      !el.closest('[hidden]') && getComputedStyle(el).display !== 'none'
    );
    if (!els.length) return () => {};
    const first = els[0], last = els[els.length - 1];
    const handler = e => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    modal.addEventListener('keydown', handler);
    return () => modal.removeEventListener('keydown', handler);
  }

  /* ── Swipe to dismiss ── */
  function addSwipeToDismiss(dialog, closeFn) {
    let startY = 0, dy = 0;
    const surface = dialog.querySelector('.modal-surface') || dialog;

    surface.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
      dy = 0;
    }, { passive: true });

    surface.addEventListener('touchmove', e => {
      dy = e.touches[0].clientY - startY;
      if (dy > 0) surface.style.transform = `translateY(${dy}px)`;
    }, { passive: true });

    surface.addEventListener('touchend', () => {
      if (dy > 80) {
        surface.style.transform = '';
        closeFn();
      } else {
        surface.style.transition = 'transform 0.25s var(--ease-out, ease)';
        surface.style.transform  = '';
        surface.addEventListener('transitionend', () => {
          surface.style.transition = '';
        }, { once: true });
      }
      dy = 0;
    });
  }

  /* ── QR Modal ── */
  function openQRModal(opener) {
    if (!$.qrModal) return;
    _qrOpener = opener || null;
    document.body.classList.add('modal-open');
    $.qrModal.showModal();
    const releaseTrap = trapFocus($.qrModal);
    $.qrModal._releaseTrap = releaseTrap;
    if ($.closeModal) $.closeModal.focus();
    document.title = 'QR Menu — Turkiana';
  }
  function closeQRModal() {
    if (!$.qrModal) return;
    if ($.qrModal._releaseTrap) $.qrModal._releaseTrap();
    $.qrModal.close();
    document.body.classList.remove('modal-open');
    document.title = 'Turkiana · Turkish Café & Desserts — Doha';
    if (_qrOpener) { _qrOpener.focus(); _qrOpener = null; }
  }

  /* ── Item Modal ── */
  function openItemModal(itemId, openerEl) {
    const item = ITEM_MAP[itemId];
    if (!item || !$.itemModal) return;
    _itemOpener = openerEl || null;

    const isAr   = state.lang === 'ar';
    const name   = isAr ? item.ar : item.en;
    const desc   = isAr ? (item.descAr || item.descEn) : item.descEn;
    const imgSrc = IMG_BASE + item.img;

    if ($.itemImgWrapper) {
      $.itemImgWrapper.innerHTML = `<img src="${imgSrc}" alt="${name}" style="max-width:100%; max-height:70vh; object-fit:contain;" decoding="async">`;
    }
    if ($.itemModalTitle) $.itemModalTitle.textContent = name;
    if ($.itemModalPrice) $.itemModalPrice.textContent = `${item.price} ${CURRENCY}`;
    if ($.itemModalDesc)  $.itemModalDesc.textContent  = desc;
    if ($.itemModalCal)   $.itemModalCal.textContent   = item.cal;

    const catLabel = CATEGORIES.find(c => c.key === item.cat);
    if ($.itemModalCat) $.itemModalCat.textContent = isAr ? catLabel?.ar : catLabel?.en;
    if ($.itemModalBadge) {
      $.itemModalBadge.innerHTML = item.badge ? `<span class="card-badge">${BADGE_LABELS[item.badge]}</span>` : '';
    }
    if ($.itemModalDiet) {
      $.itemModalDiet.innerHTML = item.diet.map(d =>
        `<li class="diet-dot" data-diet="${d}" aria-label="${DIET_LABELS[d] || d}"></li>`
      ).join('');
    }

    document.body.classList.add('modal-open');
    $.itemModal.showModal();
    /* Update URL without reloading */
    history.pushState({ itemId }, '', `?item=${encodeURIComponent(itemId)}`);
    document.title = `${name} — Turkiana`;

    const releaseTrap = trapFocus($.itemModal);
    $.itemModal._releaseTrap = releaseTrap;
    if ($.itemCloseModal) $.itemCloseModal.focus();
    injectShareButton();
  }

  function closeItemModal() {
    if (!$.itemModal) return;
    if ($.itemModal._releaseTrap) $.itemModal._releaseTrap();
    $.itemModal.close();
    document.body.classList.remove('modal-open');
    /* Restore URL */
    history.pushState(null, '', window.location.pathname);
    document.title = 'Menu — Turkiana · Turkish Café & Desserts';
    if (_itemOpener) { _itemOpener.focus(); _itemOpener = null; }
  }

  /* ── Share via Web Share API ── */
  function injectShareButton() {
    if (!navigator.share || !$.itemModal) return;
    const actions = $.itemModal.querySelector('.item-modal-actions');
    if (!actions || actions.querySelector('.tk-share-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost tk-share-btn';
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share`;
    btn.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: `${$.itemModalTitle?.textContent} — Turkiana`,
          text:  `${$.itemModalTitle?.textContent} | ${$.itemModalPrice?.textContent}\n${$.itemModalDesc?.textContent}`,
          url:   window.location.href,
        });
      } catch (err) { if (err.name !== 'AbortError') console.warn('[Turkiana] Share:', err); }
    });
    actions.appendChild(btn);
  }

  /* ── Swipe setup ── */
  function initSwipeToDismiss() {
    if ($.qrModal)   addSwipeToDismiss($.qrModal,   closeQRModal);
    if ($.itemModal) addSwipeToDismiss($.itemModal, closeItemModal);
  }

  /* ============================================================
     §20  OPENING HOURS HIGHLIGHT
  ============================================================ */
  /* Called in showMenuPage() — already defined there */

  /* ============================================================
     §21  EVENTS
  ============================================================ */
  function debounce(fn, ms) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }

  function bindCategoryEvents() {
    if (!$.categoryScroller) return;
    /* Remove old listener via clone */
    const clone = $.categoryScroller.cloneNode(true);
    $.categoryScroller.parentNode.replaceChild(clone, $.categoryScroller);
    $['categoryScroller'] = clone;

    clone.addEventListener('click', e => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;
      clone.querySelectorAll('.cat-pill').forEach(p => {
        p.classList.toggle('active', p === pill);
        p.setAttribute('aria-pressed', p === pill);
      });
      setState({ category: pill.dataset.cat });
      /* Smooth scroll to menu on mobile */
      if (window.innerWidth <= 768) {
        const menu = q('menu');
        if (menu) setTimeout(() => menu.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    });
  }

  function bindEvents() {
    /* Lang / Theme */
    if ($.langToggle)  $.langToggle.addEventListener('click',  () => setState({ lang: state.lang === 'en' ? 'ar' : 'en' }));
    if ($.themeToggle) $.themeToggle.addEventListener('click', () => setState({ dark: !state.dark }));

    /* Category (initial bind) */
    bindCategoryEvents();

    /* Search */
    if ($.searchInput) {
      $.searchInput.addEventListener('input', debounce(e => setState({ search: e.target.value }), 200));
    }
    if ($.searchClear) {
      $.searchClear.addEventListener('click', () => {
        if ($.searchInput) { $.searchInput.value = ''; $.searchInput.focus(); }
        setState({ search: '' });
      });
    }

    /* Price range */
    if ($.priceSelect) {
      $.priceSelect.addEventListener('change', e => setState({ priceRange: e.target.value }));
    }

    /* Diet chips */
    const dietChipsEl = q('dietChips');
    if (dietChipsEl) {
      dietChipsEl.addEventListener('click', e => {
        const chip = e.target.closest('.diet-chip');
        if (!chip) return;
        const diet = chip.dataset.diet;
        const pressed = chip.getAttribute('aria-pressed') === 'true';
        chip.setAttribute('aria-pressed', !pressed);
        const cur = [...state.dietFilter];
        if (!pressed) cur.push(diet);
        else cur.splice(cur.indexOf(diet), 1);
        setState({ dietFilter: cur });
      });
    }

    /* View toggle */
    if ($.viewGrid && $.viewList && $.menuGrid) {
      const setView = (v) => {
        $.menuGrid.dataset.view = v;
        $.viewGrid.classList.toggle('active', v === 'grid');
        $.viewList.classList.toggle('active', v === 'list');
        $.viewGrid.setAttribute('aria-pressed', v === 'grid');
        $.viewList.setAttribute('aria-pressed', v === 'list');
      };
      $.viewGrid.addEventListener('click', () => setView('grid'));
      $.viewList.addEventListener('click', () => setView('list'));
    }

    /* Page nav */
    if ($.viewMenuBtn) $.viewMenuBtn.addEventListener('click', showMenuPage);
    if ($.navBackBtn)  $.navBackBtn.addEventListener('click', showLandingPage);
    if ($.mobileFab) {
      $.mobileFab.addEventListener('click', () => {
        const isMenu = $.menuPage && !$.menuPage.classList.contains('hidden');
        isMenu ? showLandingPage() : showMenuPage();
      });
    }

    /* QR modal */
    if ($.qrBtn)    $.qrBtn.addEventListener('click',    () => openQRModal($.qrBtn));
    if ($.herQrBtn) $.herQrBtn.addEventListener('click', () => openQRModal($.herQrBtn));
    if ($.closeModal) $.closeModal.addEventListener('click', closeQRModal);
    if ($.qrCloseX)   $.qrCloseX.addEventListener('click',  closeQRModal);
    if ($.qrModal) {
      $.qrModal.addEventListener('click', e => { if (e.target === $.qrModal) closeQRModal(); });
      $.qrModal.addEventListener('cancel', e => { e.preventDefault(); closeQRModal(); }); /* ESC */
    }

    /* Item modal */
    if ($.itemCloseModal) $.itemCloseModal.addEventListener('click', closeItemModal);
    if ($.itemCloseX)     $.itemCloseX.addEventListener('click',     closeItemModal);
    if ($.itemModal) {
      $.itemModal.addEventListener('click', e => { if (e.target === $.itemModal) closeItemModal(); });
      $.itemModal.addEventListener('cancel', e => { e.preventDefault(); closeItemModal(); }); /* ESC */
    }

    /* Menu grid — delegate */
    if ($.menuGrid) {
      $.menuGrid.addEventListener('click', e => {
        const card = e.target.closest('.menu-card');
        if (card) openItemModal(card.dataset.id, card);
      });
      $.menuGrid.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.menu-card');
        if (card) { e.preventDefault(); openItemModal(card.dataset.id, card); }
      });
    }

    /* Scroll-to-top */
    if ($.scrollTopBtn) {
      $.scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* Empty state reset — scroll to top */
    if ($.emptyReset) {
      $.emptyReset.addEventListener('click', () => {
        setState({ category: 'all', search: '', dietFilter: [], priceRange: 'all' });
        if ($.searchInput) $.searchInput.value = '';
        if ($.priceSelect) $.priceSelect.value = 'all';
        q('dietChips')?.querySelectorAll('.diet-chip').forEach(c => c.setAttribute('aria-pressed','false'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* Spotlight spotlight item click (delegated from buildSpotlight) */
    /* already bound there */

    /* Popstate — handle back from item modal */
    window.addEventListener('popstate', e => {
      if ($.itemModal?.open) closeItemModal();
    });
  }

  /* ============================================================
     §22  SYSTEM DARK MODE SYNC
  ============================================================ */
  function initSystemThemeSync() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (localStorage.getItem('tk-dark') !== null) return;
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
  }

  /* ============================================================
     §23  SERVICE WORKER + UPDATE TOAST
  ============================================================ */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('[Turkiana] SW registered:', reg.scope))
      .catch(err => console.warn('[Turkiana] SW failed:', err));
  }

  function showUpdateToast(worker) {
    if (q('tk-update-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'tk-update-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span>A new version of Turkiana is ready.</span>
      <button id="tk-toast-refresh">Refresh</button>
      <button id="tk-toast-dismiss" aria-label="Dismiss">✕</button>`;
    Object.assign(toast.style, {
      position:'fixed', bottom:'calc(max(4.5rem,env(safe-area-inset-bottom))+1rem)',
      left:'50%', transform:'translateX(-50%)',
      background:'var(--c-surface-solid,#141416)', color:'var(--c-ivory,#f0e8d8)',
      border:'1px solid var(--c-border-strong)', borderRadius:'999px',
      padding:'0.65rem 1.25rem', display:'flex', alignItems:'center', gap:'0.75rem',
      fontSize:'0.8rem', boxShadow:'0 8px 32px rgba(0,0,0,0.45)',
      zIndex:'9999', fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap',
      animation:'toastIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
    });
    if (!q('tk-toast-style')) {
      const s = document.createElement('style');
      s.id = 'tk-toast-style';
      s.textContent = `#tk-update-toast button{background:var(--c-gold,#c6a15b);color:#0c0805;border:none;border-radius:999px;padding:.3rem .9rem;font-size:.75rem;font-weight:600;letter-spacing:.08em;cursor:pointer;font-family:inherit}#tk-toast-dismiss{background:transparent!important;color:var(--c-ivory-soft,#a89b82)!important;padding:.3rem .5rem!important}`;
      document.head.appendChild(s);
    }
    document.body.appendChild(toast);
    q('tk-toast-refresh').addEventListener('click', () => { worker.postMessage('skipWaiting'); window.location.reload(); });
    q('tk-toast-dismiss').addEventListener('click', () => toast.remove());
    setTimeout(() => toast.remove(), 18000);
  }

  function initSWUpdateToast() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then(reg => {
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        if (!w) return;
        w.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) showUpdateToast(w);
        });
      });
    });
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg?.waiting) showUpdateToast(reg.waiting);
    });
  }

  /* ============================================================
     §24  DEEP LINK  ?item=<id>
  ============================================================ */
  function initDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');
    if (!itemId) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        showMenuPage();
        const card = qs(`.menu-card[data-id="${CSS.escape(itemId)}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => openItemModal(itemId, card), 400);
        }
      }, 200);
    });
  }

  /* ============================================================
     §25  INIT
  ============================================================ */
  function init() {
    try {
      cacheDOM();
      applyTheme();
      initHeroTitle();
      buildAllCards();
      buildCategoryPills();
      buildTicker();
      buildSpotlight();
      applyLanguage();
      bindEvents();
      initObservers();
      initCursor();
      initNavScroll();
      initCardTilt();
      initHero();
      initSteam();
      initSwipeToDismiss();
      initSystemThemeSync();
      registerServiceWorker();
      initSWUpdateToast();
      initDeepLink();
      highlightTodayHours();
    } catch (err) {
      console.error('[Turkiana] Init error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
