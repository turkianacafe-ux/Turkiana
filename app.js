(function () {
  'use strict';

  /* ============================================================
     DATA
  ============================================================ */
  const CURRENCY = 'QAR';
  const IMG_BASE = 'https://turkianacafe-ux.github.io/Turkiana/';

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

  const MENU_ITEMS = [
    {id:'brew1', cat:'brewed',    en:'Classic Turkish Coffee',          ar:'قهوة تركية كلاسيكية',       descEn:'Finely ground coffee brewed in copper cezve…',              descAr:'قهوة تركية مطحونة ناعماً تُحضر في كنكة نحاسية وتقدم برغوة كثيفة.', price:28, img:'TurkishCoffee.jfif',          cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew2', cat:'brewed',    en:'Double Turkish Coffee',           ar:'قهوة تركية مزدوجة',          descEn:'Double the intensity…',                                     descAr:'ضعف كمية القهوة التركية للحصول على نكهة أقوى وأعمق.', price:40, img:'TurkishCoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew3', cat:'brewed',    en:'Ottoman Mastic Coffee',           ar:'قهوة عثمانية بالمستيك',      descEn:'Premium coffee enriched…',                                  descAr:'قهوة ممتازة مخلوطة بالمستكة العطرية لمنحها طعماً عثمانياً فريداً.', price:28, img:'Ottomanmastica.jfif',         cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:'bestseller'},
    {id:'brew4', cat:'brewed',    en:'Hazelnut Turkish Coffee',         ar:'قهوة تركية بالبندق',         descEn:'Classic Turkish coffee blended…',                           descAr:'قهوة تركية كلاسيكية مدمجة مع نكهة البندق المحمص الفاخرة.', price:28, img:'Ottomancoffee.jfif',          cal:'20 kcal', diet:[],                                                badge:'limited',  outOfStock:true},
    {id:'brew5', cat:'brewed',    en:'Cardamom Turkish Coffee',         ar:'قهوة تركية بالهيل',          descEn:'Infused with aromatic green cardamom…',                     descAr:'قهوة تركية معطرة بالهيل الأخضر العطري.', price:28, img:'Ottomancardamom.jfif',        cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew6', cat:'brewed',    en:'Sahlep',                          ar:'سحلب',                       descEn:'Ancient Anatolian comfort drink…',                           descAr:'شراب دفء الأناضول القديم مصنوع من مسحوق الأوركيد والحليب.', price:38, img:'Sahlep.jfif',                cal:'200 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'brew7', cat:'brewed',    en:'Arabic Coffee — Full Dalla',      ar:'قهوة عربية – دلة كاملة',     descEn:'Ceremonial centrepiece…',                                    descAr:'دلة كاملة من القهوة العربية الفاخرة، مثالية للتقديم الجماعي.', price:90, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew8', cat:'brewed',    en:'Arabic Coffee — Half Dalla',      ar:'قهوة عربية – نصف دلة',       descEn:'Half-serving of ceremonial…',                                descAr:'نصف دلة من القهوة العربية الأصيلة.', price:55, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew9', cat:'brewed',    en:'Arabic Coffee — Cup',             ar:'قهوة عربية – فنجان',         descEn:'Personal serving of authentic…',                            descAr:'فنجان شخصي من القهوة العربية الأصيلة.', price:35, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'tea1',  cat:'tea',       en:'Turkish Tea',                     ar:'شاي تركي',                   descEn:'Deep amber Rize tea…',                                       descAr:'شاي ريزا التركي العميق بلون الكهرمان، يقدم في كأس تقليدي.', price:15, img:'Turkishtea.jfif',            cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea2',  cat:'tea',       en:'Turkish Tea Pot',                 ar:'إبريق شاي تركي',             descEn:'Generous pot of Rize tea…',                                 descAr:'إبريق كبير من شاي ريزا التركي الفاخر.', price:45, img:'Teapot.jfif',               cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea3',  cat:'tea',       en:'Apple Tea Hot & Ice',             ar:'شاي التفاح',                 descEn:'Sun-ripened apple essence…',                                descAr:'جوهر التفاح الناضج تحت أشعة الشمس، يقدم ساخناً أو مثلجاً.', price:35, img:'Appletea.jfif',              cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea4',  cat:'tea',       en:'Mulberry Tea Hot & Ice',          ar:'شاي التوت',                  descEn:'White mulberry infusion…',                                  descAr:'منقوع التوت الأبيض اللذيذ، ساخن أو مثلج.', price:35, img:'Mulberrytea.jfif',           cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea5',  cat:'tea',       en:'Lemon Mint',                      ar:'ليمون بالنعناع',             descEn:'Zesty squeezed lemon and fresh garden mint…',               descAr:'ليمون معصور طازجاً ونعناع حديقة عطري.', price:35, img:'Lemonminttea.jfif',          cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea6',  cat:'tea',       en:'Pomegranate Tea Hot & Ice',       ar:'شاي الرمان',                 descEn:'Vibrant pomegranate infusion…',                             descAr:'منقوع رمان نابض بالحياة، ساخن أو مثلج.', price:35, img:'Pomegranatetea.jfif',        cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea7',  cat:'tea',       en:'Matcha Latte — Iced',             ar:'ماتشا لاتيه',                descEn:'Ceremonial-grade matcha…',                                  descAr:'ماتشا احتفالية مخفوقة مع حليب.', price:36, img:'Matcha.jfif',               cal:'95 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea13', cat:'tea',       en:'Hibiscus Hot & Ice',              ar:'كركديه',                     descEn:'Ruby-red infusion…',                                        descAr:'منقوع ياقوتي منعش ساخن أو مثلج.', price:36, img:'Hibiscustea.jfif',           cal:'25 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea15', cat:'tea',       en:'Winter Tea',                      ar:'شاي الشتاء',                 descEn:'Warming seasonal spice blend…',                             descAr:'مزيج توابل شتوية دافئ من القرفة والزنجبيل والقرنفل.', price:38, img:'Wintertea.jfif',             cal:'30 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea16', cat:'tea',       en:'Chamomile',                       ar:'شاي البابونج',               descEn:'Calming golden chamomile…',                                 descAr:'بابونج ذهبي مهدئ.', price:36, img:'Chamomiletea.jfif',          cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea17', cat:'tea',       en:'Green Tea',                       ar:'شاي أخضر',                   descEn:'Pure, clean Japanese green tea…',                           descAr:'شاي أخضر ياباني نقي ونظيف.', price:36, img:'Greentea.jfif',              cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe1', cat:'cafe',      en:'Latte Hot & Ice',                 ar:'لاتيه',                      descEn:'Silky microfoam espresso…',                                 descAr:'إسبريسو مع رغوة حليب ناعمة كالحرير.', price:29, img:'Latte.jfif',                cal:'170 kcal',diet:['contains-dairy'],                                badge:'bestseller'},
    {id:'cafe2', cat:'cafe',      en:'Cappuccino Hot & Ice',            ar:'كابوتشينو',                  descEn:'Equal parts espresso…',                                     descAr:'ثلث إسبريسو، ثلث حليب، ثلث رغوة كثيفة.', price:29, img:'Cappuccino.jfif',            cal:'150 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe3', cat:'cafe',      en:'Spanish Latte Hot & Ice',         ar:'لاتيه إسباني',               descEn:'Sweetened condensed milk…',                                 descAr:'إسبريسو مع حليب مكثف محلى لمسة كريمية.', price:32, img:'Latte.jfif',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe4', cat:'cafe',      en:'Salted Caramel Latte Hot & Ice',  ar:'لاتيه كراميل مملح',          descEn:'House-made caramel…',                                       descAr:'لاتيه بكراميل منزلي الصنع مع لمسة ملح البحر.', price:32, img:'Latte.jfif',                cal:'230 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe5', cat:'cafe',      en:'Vanilla Latte Hot & Ice',         ar:'لاتيه فانيليا',              descEn:'Madagascar bourbon vanilla…',                               descAr:'فانيليا بوربون مدغشقر في لاتيه كريمي.', price:32, img:'Latte.jfif',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe6', cat:'cafe',      en:'Hazelnut Latte Hot & Ice',        ar:'لاتيه البندق',               descEn:'Roasted hazelnut syrup…',                                   descAr:'شراب البندق المحمص في لاتيه غني.', price:32, img:'Latte.jfif',                cal:'180 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe9', cat:'cafe',      en:'White Mocha Hot & Ice',           ar:'وايت موكا',                  descEn:'White chocolate blended…',                                  descAr:'شوكولاتة بيضاء ممزوجة بالإسبريسو والحليب.', price:32, img:'Latte.jfif',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe10',cat:'cafe',      en:'Mocha Hot & Ice',                 ar:'موكا',                       descEn:'Dark chocolate and bold espresso…',                         descAr:'شوكولاتة داكنة وإسبريسو قوي.', price:32, img:'Latte.jfif',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe11',cat:'cafe',      en:'Flat White Hot & Ice',            ar:'فلات وايت',                  descEn:'Double ristretto with silky…',                              descAr:'إسبريسو مزدوج مع حليب مخملي ناعم.', price:27, img:'Flatwhite.jfif',             cal:'140 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe14',cat:'cafe',      en:'Espresso Macchiato',              ar:'ماكياتو',                    descEn:'Espresso marked with a delicate…',                          descAr:'إسبريسو مع لمسة من رغوة الحليب.', price:24, img:'Latte.jfif',                cal:'60 kcal', diet:['contains-dairy'],                                badge:null},
    {id:'cafe15',cat:'cafe',      en:'Espresso Single',                 ar:'إسبريسو مفرد',               descEn:'Pure concentrated coffee…',                                 descAr:'جرعة إسبريسو مركزة نقية.', price:18, img:'Espresso.jfif',              cal:'3 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe17',cat:'cafe',      en:'Americano Hot & Ice',             ar:'أمريكانو',                   descEn:'Espresso pulled long…',                                     descAr:'إسبريسو ممتد بالماء الساخن.', price:21, img:'Americano.jfif',             cal:'5 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe18',cat:'cafe',      en:'Hot Chocolate',                   ar:'هوت شوكولاتة',               descEn:'Artisanal dark cocoa…',                                     descAr:'كاكاو داكن حرفي مذاب في الحليب الدافئ.', price:36, img:'Latte.jfif',                cal:'360 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'spec1', cat:'specialty', en:'V60 Pour Over',                   ar:'V60 بور أوفر',               descEn:'Single origin beans…',                                      descAr:'حبوب قهوة مختصة تُحضر بالتقطير اليدوي.', price:33, img:'V60.webp',                  cal:'2 kcal',  diet:['vegan'],                                         badge:'signature'},
    {id:'spec2', cat:'specialty', en:'Ice Drip',                        ar:'آيس دريب',                   descEn:'8-hour cold drip extraction…',                              descAr:'استخلاص بطيء بالتنقيط على الثلج لمدة 8 ساعات.', price:35, img:'Icedrip.jpg',               cal:'2 kcal',  diet:['vegan'],                                         badge:'signature'},
    {id:'spec3', cat:'specialty', en:'Cold Brew',                       ar:'كولد برو',                   descEn:'18+ hour steep — ultra smooth…',                           descAr:'نقع بارد لأكثر من 18 ساعة لقهوة ناعمة كالحرير.', price:37, img:'Coldbrew.webp',              cal:'2 kcal',  diet:['vegan'],                                         badge:'bestseller'},
    {id:'ref16', cat:'refreshers',en:'Lemonade',                        ar:'ليمونادة',                   descEn:'Zesty lemon drink…',                                        descAr:'مشروب ليمون منعش.', price:18, img:'Lemonade.png',               cal:'120 kcal',diet:[],                                                 badge:null},
    {id:'ref15', cat:'refreshers',en:'Orange Juice',                    ar:'عصير برتقال',                descEn:'Freshly squeezed orange juice…',                            descAr:'عصير برتقال طازج معصور.', price:18, img:'Orangejuice.png',            cal:'110 kcal',diet:[],                                                 badge:null},
    {id:'ref10', cat:'refreshers',en:'Cooling Breeze',                  ar:'نسيم منعش',                  descEn:'A chilled blend of citrus…',                                descAr:'مزيج مثلج من الحمضيات والأعشاب المنعشة.', price:45, img:'Coolingbreeze.jfif',         cal:'150 kcal',diet:[],                                                 badge:null},
    {id:'ref3',  cat:'refreshers',en:'Orange Earl Grey',                ar:'برتقال إيرل جراي',           descEn:'Citrus-bergamot duet…',                                     descAr:'دوئية البرغموت والحمضيات في شاي إيرل جراي.', price:47, img:'Orangeearlygreytea.png',     cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'ref6',  cat:'refreshers',en:'Blue Lagoon',                     ar:'موهيتو توت أزرق',            descEn:'Wild blueberries with fresh mint…',                         descAr:'توت بري مع نعناع طازج ولمسة ليمون.', price:38, img:'Bluelagoon.jfif',            cal:'150 kcal',diet:[],                                                 badge:null},
    {id:'ref7',  cat:'refreshers',en:'Strawberry Mojito',               ar:'موهيتو فراولة',              descEn:'Fresh strawberries muddled…',                               descAr:'فراولة طازجة مدقوقة مع النعناع.', price:42, img:'Strawberrymojito.png',       cal:'170 kcal',diet:[],                                                 badge:null},
    {id:'ref13a',cat:'refreshers',en:'Still Water (Small)',              ar:'مياه عادية (صغير)',          descEn:'Pure still water…',                                         descAr:'مياه نقية طبيعية، صغيرة.', price:11, img:'Stillwater.jfif',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref14', cat:'refreshers',en:'Still Water (Large)',              ar:'مياه عادية (كبير)',          descEn:'Pure still water…',                                         descAr:'مياه نقية طبيعية، كبيرة.', price:21, img:'Stillwater.jfif',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref12a',cat:'refreshers',en:'Sparkling Water',                 ar:'مياه غازية',                 descEn:'Naturally carbonated sparkling…',                           descAr:'مياه غازية طبيعية.', price:23, img:'Sparklingwater.jpg',         cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'bak1',  cat:'baklava',   en:'Baklava Mix',                     ar:'بقلاوة مشكلة',               descEn:'Stunning assortment of Ottoman…',                           descAr:'تشكيلة مذهلة من البقلاوة العثمانية المحشوة بالمكسرات.', price:65, img:'Mixbaklava.jfif',            cal:'450 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak2',  cat:'baklava',   en:'Carrot Slice Baklava',            ar:'بقلاوة جزر',                 descEn:'Traditional Ottoman baklava…',                              descAr:'بقلاوة جزر عثمانية تقليدية محشوة بالمكسرات.', price:45, img:'Carrotslice.jfif',           cal:'420 kcal',diet:['contains-nuts'],                                 badge:'signature'},
    {id:'bak3',  cat:'baklava',   en:'Carrot Baklava with Ice Cream',   ar:'بقلاوة جزر مع آيس كريم',    descEn:'Warm carrot baklava…',                                     descAr:'بقلاوة جزر دافئة تقدم مع آيس كريم.', price:55, img:'Carrotslicewithicecream.jfif',cal:'620 kcal',diet:['contains-nuts','contains-dairy'],               badge:'bestseller'},
    {id:'bak4',  cat:'baklava',   en:'Trio Baklava',                    ar:'تريو بقلاوة',                descEn:'Three distinct baklava styles…',                            descAr:'ثلاث قطع من البقلاوة بأشكال مختلفة.', price:45, img:'Triobaklava.jfif',            cal:'480 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak13', cat:'baklava',   en:'Kunafa',                          ar:'كنافة',                      descEn:'Shredded kataifi with rich cheese…',                       descAr:'كنافة شعر مقرمشة محشوة بالجبن الكريمي.', price:45, img:'Kunafa.jfif',               cal:'520 kcal',diet:['contains-dairy'],                                badge:'signature'},
    {id:'bak14', cat:'baklava',   en:'Brownies',                        ar:'براونيز',                    descEn:'Dense, fudge-rich dark chocolate…',                        descAr:'براونيز شوكولاتة داكنة غنية وفادحة.', price:55, img:'Brownies.jfif',              cal:'380 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak15', cat:'baklava',   en:'Honey Cake',                      ar:'كيكة العسل',                 descEn:'Soft layered honey cake…',                                 descAr:'كيكة عسل طرية بطبقات.', price:45, img:'Honeycake.png',              cal:'520 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak16', cat:'baklava',   en:'Tiramisu',                        ar:'تيراميسو',                   descEn:'Classic Italian dessert…',                                 descAr:'تيراميسو كلاسيكي بطبقات البسكويت والكريمة.', price:45, img:'Tiramisu.png',               cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak17', cat:'baklava',   en:'Mango Cake',                      ar:'كيكة المانجو',               descEn:'Light sponge cake with fresh mango…',                      descAr:'كيك إسفنجي خفيف بقطع المانجو الطازجة.', price:45, img:'Mangocake.jfif',              cal:'450 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak18', cat:'baklava',   en:'Pistachio Cake',                  ar:'كيكة الفستق',                descEn:'Rich pistachio cake…',                                     descAr:'كيك فستق غني بطبقات كريمة الفستق.', price:45, img:'Pistachiocake.webp',         cal:'530 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'bak19', cat:'baklava',   en:'San Sebastian Cheesecake',        ar:'تشيزكيك سان سيباستيان',      descEn:'Burnt Basque cheesecake…',                                 descAr:'تشيز كيك باسك محروق الوجه، طري من الداخل.', price:45, img:'Sansebastian.jfif',           cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak20', cat:'baklava',   en:'Fanzuella Sweet',                 ar:'فانزويلا سويت',              descEn:'Sweet creamy dessert…',                                    descAr:'حلى كريمي حلو مع لمسة مكسرات.', price:45, img:'Fanzuella.jfif',              cal:'350 kcal',diet:['contains-dairy','contains-dairy','contains-nuts'], badge:null},
    {id:'bak21', cat:'baklava',   en:'Trileche',                        ar:'تريليتشي',                   descEn:'Soft sponge soaked in three kinds…',                       descAr:'كيك إسفنجي منقوع بثلاثة أنواع حليب.', price:45, img:'Trileche.jfif',               cal:'400 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'snack01',cat:'snacks',   en:'Turkish Ice Cream',               ar:'آيس كريم تركي',              descEn:'Classic stretchy dondurma…',                                descAr:'دوندورما تركية كلاسيكية قابلة للمط.', price:27, img:'Icecreamcup.jfif',            cal:'210 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'snack1',cat:'snacks',    en:'Nuts Stand — Tall',               ar:'مكسرات – ستاند كبير',        descEn:'Premium roasted nuts…',                                     descAr:'مكسرات فاخرة محمصة تقدم في ستاند كبير.', price:99, img:'Tallnuts.jfif',               cal:'300 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'snack2',cat:'snacks',    en:'Nuts Stand — Small',              ar:'مكسرات – ستاند صغير',        descEn:'Curated premium roasted nuts…',                            descAr:'مكسرات فاخرة محمصة تقدم في ستاند صغير.', price:60, img:'Smallnuts.jfif',              cal:'180 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'cro1',  cat:'croissant', en:'Plain Butter Croissant',          ar:'كرواسون زبدة',               descEn:'Classic Parisian all-butter…',                              descAr:'كرواسون زبدة باريسي كلاسيكي.', price:20, img:'Plainbuttercroissant.jfif',  cal:'320 kcal',diet:['vegetarian'],                                    badge:'signature'},
    {id:'cro2',  cat:'croissant', en:'Cheese Croissant',                ar:'كرواسون جبن',                descEn:'Flaky buttery croissant…',                                 descAr:'كرواسون زبدة محشو بالجبنة.', price:20, img:'Cheesecroissant.jfif',        cal:'360 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro3',  cat:'croissant', en:'Chocolate Croissant',             ar:'كرواسون شوكولاتة',           descEn:'Buttery laminated pastry…',                                descAr:'كرواسون زبدة محشو بالشوكولاتة.', price:20, img:'Chocolatecroissant.jfif',      cal:'380 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro4',  cat:'croissant', en:'Almond Croissant',                ar:'كرواسون لوز',                descEn:'Almond frangipane cream…',                                 descAr:'كرواسون محشو بكريمة اللوز.', price:20, img:'Almondcroissant.jfif',        cal:'400 kcal',diet:['vegetarian','contains-nuts'],                   badge:null},
    {id:'cro5',  cat:'croissant', en:'Cinnamon Danish',                 ar:'دانش قرفة',                  descEn:'Cinnamon sugar spiral…',                                   descAr:'دانش قرفة وسكر بشكل حلزوني.', price:20, img:'Cinnamondanish.jfif',        cal:'390 kcal',diet:['vegetarian'],                                    badge:null},
  ];

  /* ============================================================
     I18N
  ============================================================ */
  const I18N = {
    en: {
      tagline:'Luxury in Every Sip of Tradition', eyebrow:'Est. Ottoman Heritage',
      viewMenu:'View Menu', aboutLabel:'Our Heritage', menuLabel:'Selections',
      aboutCaption:'Hand-crafted Ottoman baklava, daily',
      aboutP1:"Turkiana is a tribute to the centuries-old Turkish coffee culture, reimagined through a contemporary lens. Every cup, every bite of baklava is crafted with precision, served in an ambiance of marble, gold, and warm candlelight.",
      aboutP2:"A destination for those who seek the finest — from our signature brews to hand-rolled baklava, we bring Istanbul's grand café tradition to the world's most discerning corners.",
      statLabel1:'Menu Items', statLabel2:'Categories', statLabel3:'Stories',
      searchPlaceholder:'Search flavours…', resultSingular:'item', resultPlural:'items',
      emptyTitle:'Nothing found', emptySub:'Try a different search or browse all categories.',
      langLabel:'Switch to Arabic', themeLight:'Switch to light mode', themeDark:'Switch to dark mode',
      qrTitle:'Scan to Browse', qrDesc:'Point your camera at the code below for the full Turkiana menu experience.',
      closeModal:'Close', fabLabel:'View Menu', footerTagline:'Luxury in Every Sip of Tradition',
      itemCloseLabel:'Close',
    },
    ar: {
      tagline:'الفخامة في كل رشفة من التراث', eyebrow:'تراث عثماني أصيل',
      viewMenu:'عرض القائمة', aboutLabel:'تراثنا', menuLabel:'التشكيلة',
      aboutCaption:'بقلاوة عثمانية تُصنع يدوياً يومياً',
      aboutP1:'تركيانا تُحيي تقاليد القهوة التركية العريقة برؤية عصرية. كل فنجان وكل قطعة بقلاوة تُصنع بدقة متناهية في أجواء من الرخام والذهب وضوء الشموع الدافئ.',
      aboutP2:'وجهة لعشاق الأصالة الفاخرة — من قهوتنا المميزة إلى البقلاوة الملفوفة يدويًا، ننقل تراث مقاهي إسطنبول العريقة إلى أرقى زوايا العالم.',
      statLabel1:'صنف من القائمة', statLabel2:'تصنيفات', statLabel3:'قصة',
      searchPlaceholder:'ابحث عن النكهات…', resultSingular:'صنف', resultPlural:'أصناف',
      emptyTitle:'لا توجد نتائج', emptySub:'جرّب بحثاً مختلفاً أو تصفح جميع التصنيفات.',
      langLabel:'التبديل إلى الإنجليزية', themeLight:'التبديل إلى الوضع الفاتح', themeDark:'التبديل إلى الوضع الداكن',
      qrTitle:'امسح لتصفح', qrDesc:'وجّه الكاميرا نحو الرمز أدناه للوصول إلى قائمة تركيانا.',
      closeModal:'إغلاق', fabLabel:'عرض القائمة', footerTagline:'الفخامة في كل رشفة من التراث',
      itemCloseLabel:'إغلاق',
    },
  };

  /* ============================================================
     STATE
  ============================================================ */
  const state = {
    lang:     localStorage.getItem('tk-lang') || 'en',
    dark:     (() => {
      const stored = localStorage.getItem('tk-dark');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    })(),
    category: 'all',
    search:   '',
  };

  const hash = window.location.hash;
  if (hash.startsWith('#category=')) {
    const catFromHash = hash.slice('#category='.length);
    if (CATEGORIES.some(c => c.key === catFromHash)) {
      state.category = catFromHash;
    }
  }

  function setState(partial) {
    const prev = { ...state };
    Object.assign(state, partial);
    if ('lang' in partial && partial.lang !== prev.lang) applyLanguage();
    if ('dark' in partial && partial.dark !== prev.dark) applyTheme();
    if ('category' in partial || 'search' in partial) {
      clearTimeout(applyFilter._t);
      applyFilter();
    }
    if ('lang' in partial) localStorage.setItem('tk-lang', state.lang);
    if ('dark' in partial) localStorage.setItem('tk-dark', state.dark);
    if ('category' in partial) {
      if (state.category === 'all') history.replaceState(null, '', window.location.pathname);
      else history.replaceState(null, '', '#category=' + state.category);
    }
  }

  /* ============================================================
     DOM REFS
  ============================================================ */
  const dom = {
    html:             document.documentElement,
    mainNav:          document.getElementById('mainNav'),
    cursor:           document.getElementById('cursor'),
    cursorRing:       document.getElementById('cursorRing'),
    heroTitle:        document.getElementById('heroTitle'),
    heroTagline:      document.getElementById('heroTagline'),
    heroEyebrow:      document.getElementById('heroEyebrow'),
    heroBg:           document.getElementById('heroBg'),
    viewMenuBtn:      document.getElementById('viewMenuBtn'),
    viewMenuLabel:    document.getElementById('viewMenuLabel'),
    tickerTrack:      document.getElementById('tickerTrack'),
    aboutLabel:       document.getElementById('aboutLabel'),
    aboutCaption:     document.getElementById('aboutCaption'),
    aboutP1:          document.getElementById('aboutP1'),
    aboutP2:          document.getElementById('aboutP2'),
    statLabel1:       document.getElementById('statLabel1'),
    statLabel2:       document.getElementById('statLabel2'),
    statLabel3:       document.getElementById('statLabel3'),
    menuLabel:        document.getElementById('menuLabel'),
    categoryScroller: document.getElementById('categoryScroller'),
    searchInput:      document.getElementById('searchInput'),
    searchClear:      document.getElementById('searchClear'),
    resultCount:      document.getElementById('resultCount'),
    menuGrid:         document.getElementById('menuGrid'),
    emptyState:       document.getElementById('emptyState'),
    emptyTitle:       document.getElementById('emptyTitle'),
    emptySub:         document.getElementById('emptySub'),
    liveRegion:       document.getElementById('liveRegion'),
    langToggle:       document.getElementById('langToggle'),
    themeToggle:      document.getElementById('themeToggle'),
    themeIcon:        document.getElementById('themeIcon'),
    qrBtn:            document.getElementById('qrBtn'),
    herQrBtn:         document.getElementById('herQrBtn'),
    qrModal:          document.getElementById('qrModal'),
    closeModal:       document.getElementById('closeModal'),
    closeModalLabel:  document.getElementById('closeModalLabel'),
    itemModal:        document.getElementById('itemModal'),
    itemImgWrapper:   document.getElementById('itemImgWrapper'),
    itemModalTitle:   document.getElementById('itemModalTitle'),
    itemModalPrice:   document.getElementById('itemModalPrice'),
    itemModalDesc:    document.getElementById('itemModalDesc'),
    itemModalCal:     document.getElementById('itemModalCal'),
    itemModalDiet:    document.getElementById('itemModalDiet'),
    itemCloseModal:   document.getElementById('itemCloseModal'),
    itemCloseLabel:   document.getElementById('itemCloseLabel'),
    mobileFab:        document.getElementById('mobileFab'),
    fabLabel:         document.getElementById('fabLabel'),
    footerTagline:    document.getElementById('footerTagline'),
  };

  /* ============================================================
     RENDERING
  ============================================================ */
  function buildCardHTML(item) {
    const isAr = state.lang === 'ar';
    const name = isAr ? item.ar : item.en;
    const desc = isAr ? (item.descAr || item.descEn) : item.descEn;
    const badge = item.badge ? `<span class="card-badge">${BADGE_LABELS[item.badge]}</span>` : '';
    const catLabel = CATEGORIES.find(c => c.key === item.cat);
    const catName = isAr ? catLabel?.ar : catLabel?.en;
    const isFeatured = item.badge === 'bestseller' || item.badge === 'signature';
    const dietDots = item.diet.map(d => `<span class="diet-dot" data-diet="${d}" title="${d}"></span>`).join('');

    return `
      <article
        class="menu-card"
        data-id="${item.id}"
        data-cat="${item.cat}"
        data-featured="${isFeatured}"
        ${item.outOfStock ? 'data-stock="out"' : ''}
        aria-label="${name}, ${item.price} ${CURRENCY}"
      >
        <div class="card-thumb">
          <img
            src="${IMG_BASE}${item.img}"
            alt="${name}"
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
          >
          <div class="card-img-fallback">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
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
        </div>
        <div class="card-body">
          <p class="card-category" aria-hidden="true">${catName ?? ''}</p>
          <h3 class="card-name" data-field="name">${name}</h3>
          <p class="card-desc" data-field="desc">${desc}</p>
          <div class="card-footer">
            <span class="card-price">${item.price} ${CURRENCY}</span>
            <div class="card-meta">
              <span class="card-cal">${item.cal}</span>
              <div class="card-diet-icons" aria-label="Dietary info">${dietDots}</div>
            </div>
          </div>
        </div>
      </article>`;
  }

  function buildAllCards() {
    const frag = document.createDocumentFragment();
    const tmp = document.createElement('div');
    MENU_ITEMS.forEach(item => {
      tmp.innerHTML = buildCardHTML(item);
      frag.appendChild(tmp.firstElementChild);
    });
    dom.menuGrid.innerHTML = '';
    dom.menuGrid.appendChild(frag);
    dom.menuGrid.removeAttribute('aria-busy');
  }

  function buildCategoryPills() {
    const isAr = state.lang === 'ar';
    const frag = document.createDocumentFragment();
    const tmp = document.createElement('div');
    CATEGORIES.forEach(cat => {
      const active = cat.key === state.category;
      tmp.innerHTML = `<button class="cat-pill${active ? ' active' : ''}" data-cat="${cat.key}" aria-pressed="${active}" type="button">${isAr ? cat.ar : cat.en}</button>`;
      frag.appendChild(tmp.firstElementChild);
    });
    dom.categoryScroller.innerHTML = '';
    dom.categoryScroller.appendChild(frag);
  }

  function buildTicker() {
    const items = MENU_ITEMS.filter(i => i.badge);
    const isAr = state.lang === 'ar';
    const labels = items.map(i => `
      <span class="ticker-item">
        <span class="ticker-dot"></span>
        ${isAr ? i.ar : i.en}
        <span class="ticker-dot"></span>
        ${i.price} ${CURRENCY}
      </span>`).join('');
    dom.tickerTrack.innerHTML = labels + labels;
  }

  function updateCardTexts() {
    const isAr = state.lang === 'ar';
    const catMap = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));
    dom.menuGrid.querySelectorAll('.menu-card').forEach(card => {
      const item = MENU_ITEMS.find(i => i.id === card.dataset.id);
      if (!item) return;
      const newName = isAr ? item.ar : item.en;
      const newDesc = isAr ? (item.descAr || item.descEn) : item.descEn;
      card.querySelector('[data-field="name"]').textContent = newName;
      card.querySelector('[data-field="desc"]').textContent = newDesc;
      const overlay = card.querySelector('.card-overlay-desc');
      if (overlay) overlay.textContent = newDesc;
      card.setAttribute('aria-label', `${newName}, ${item.price} ${CURRENCY}`);
      const catEl = card.querySelector('.card-category');
      if (catEl) {
        const cd = catMap[item.cat];
        catEl.textContent = isAr ? cd?.ar : cd?.en;
      }
    });
    if (isAr) {
      dom.heroTitle.setAttribute('lang', 'en');
      document.querySelector('.nav-brand')?.setAttribute('lang', 'en');
    } else {
      dom.heroTitle.removeAttribute('lang');
      document.querySelector('.nav-brand')?.removeAttribute('lang');
    }
  }

  /* ============================================================
     FILTER
  ============================================================ */
  function applyFilter() {
    const term = state.search.toLowerCase().trim();
    const cat = state.category;
    const isAr = state.lang === 'ar';
    const cards = dom.menuGrid.querySelectorAll('.menu-card');
    let visible = 0;

    cards.forEach(card => {
      const item = MENU_ITEMS.find(i => i.id === card.dataset.id);
      if (!item) return;
      const textField = isAr ? (item.ar + ' ' + (item.descAr || item.descEn)) : (item.en + ' ' + item.descEn);
      const show = (cat === 'all' || item.cat === cat) && (!term || textField.toLowerCase().includes(term));
      card.dataset.hidden = show ? 'false' : 'true';
      if (show) visible++;
    });

    const t = I18N[state.lang];
    dom.emptyState.classList.toggle('visible', visible === 0);
    const countText = `${visible} ${visible === 1 ? t.resultSingular : t.resultPlural}`;
    dom.resultCount.textContent = countText;
    dom.searchClear.classList.toggle('visible', state.search.length > 0);
    clearTimeout(applyFilter._t);
    applyFilter._t = setTimeout(() => { dom.liveRegion.textContent = countText; }, 600);
    dom.menuGrid.classList.remove('is-loading');
  }
  applyFilter._t = null;

  /* ============================================================
     LANGUAGE
  ============================================================ */
  function applyLanguage() {
    const lang = state.lang;
    const isAr = lang === 'ar';
    const t = I18N[lang];
    dom.html.lang = lang;
    dom.html.dir = isAr ? 'rtl' : 'ltr';
    dom.heroTagline.textContent    = t.tagline;
    dom.heroEyebrow.textContent    = t.eyebrow;
    dom.viewMenuLabel.textContent  = t.viewMenu;
    dom.aboutLabel.textContent     = t.aboutLabel;
    dom.aboutCaption.textContent   = t.aboutCaption;
    dom.aboutP1.textContent        = t.aboutP1;
    dom.aboutP2.textContent        = t.aboutP2;
    dom.statLabel1.textContent     = t.statLabel1;
    dom.statLabel2.textContent     = t.statLabel2;
    dom.statLabel3.textContent     = t.statLabel3;
    dom.menuLabel.textContent      = t.menuLabel;
    dom.searchInput.placeholder    = t.searchPlaceholder;
    dom.emptyTitle.textContent     = t.emptyTitle;
    dom.emptySub.textContent       = t.emptySub;
    dom.langToggle.setAttribute('aria-label', t.langLabel);
    dom.fabLabel.textContent       = t.fabLabel;
    dom.closeModalLabel.textContent= t.closeModal;
    dom.itemCloseLabel.textContent = t.itemCloseLabel;
    dom.footerTagline.textContent  = t.footerTagline;
    updateCardTexts();
    buildCategoryPills();
    buildTicker();
    applyFilter();
  }

  /* ============================================================
     THEME
  ============================================================ */
  function applyTheme() {
    const isDark = state.dark;
    dom.html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const t = I18N[state.lang];
    dom.themeToggle.setAttribute('aria-label', isDark ? t.themeLight : t.themeDark);
    dom.themeIcon.innerHTML = isDark
      ? `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`
      : `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
  }

  /* ============================================================
     CUSTOM CURSOR
  ============================================================ */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(prefers-contrast: more)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const { cursor, cursorRing } = dom;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.body.classList.add('cursor-ready');

    document.addEventListener('mouseover', e => {
      const interactive = e.target.closest('button, a, input, .menu-card, .cat-pill');
      cursor.classList.toggle('is-hovering', !!interactive);
      cursorRing.classList.toggle('is-hovering', !!interactive);
    });
  }

  /* ============================================================
     HERO TITLE ANIMATION
  ============================================================ */
  function initHeroTitle() {
    const word = 'TURKIANA';
    dom.heroTitle.innerHTML = word.split('').map((ch, i) =>
      `<span class="char" style="animation-delay:${0.5 + i * 0.08}s">${ch}</span>`
    ).join('');
  }

  /* ============================================================
     NAV SCROLL EFFECT
  ============================================================ */
  function initNavScroll() {
    const nav = dom.mainNav;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     INTERSECTION OBSERVER – Reveals + Counter
  ============================================================ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  function initObservers() {
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed', 'is-visible');
        e.target.querySelectorAll('[data-counter]').forEach(animateCounter);
        revealObs.unobserve(e.target);
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => revealObs.observe(el));
    dom.menuGrid.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${Math.min(i * 30, 300)}ms`);
      revealObs.observe(card);
    });
  }

  /* ============================================================
     CARD THUMB TILT
  ============================================================ */
  function initCardTilt() {
    const grid = dom.menuGrid;
    grid.addEventListener('mousemove', e => {
      const thumb = e.target.closest('.card-thumb');
      if (!thumb) return;
      const r = thumb.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
      thumb.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      thumb.style.transition = 'transform 0.08s ease';
    });

    grid.addEventListener('mouseleave', () => {
      grid.querySelectorAll('.card-thumb').forEach(t => {
        t.style.transform = '';
        t.style.transition = '';
      });
    }, true);

    grid.addEventListener('mouseover', e => {
      const entering = e.target.closest('.card-thumb');
      const leaving = e.relatedTarget?.closest('.card-thumb');
      if (leaving && leaving !== entering) {
        leaving.style.transform = '';
        leaving.style.transition = '';
      }
    });
  }

  /* ============================================================
     DELEGATED IMAGE ERROR HANDLER
  ============================================================ */
  function initImageErrorHandler() {
    dom.menuGrid.addEventListener('error', (e) => {
      const img = e.target;
      if (img.tagName === 'IMG' && img.closest('.card-thumb')) {
        img.closest('.card-thumb').classList.add('image-error');
      }
    }, true);

    dom.itemModal.addEventListener('error', (e) => {
      const img = e.target;
      if (img.tagName === 'IMG' && img.closest('#itemImgWrapper')) {
        img.alt = 'Image unavailable';
        img.style.opacity = '0.3';
      }
    }, true);
  }

  /* ============================================================
     MODAL – QR
  ============================================================ */
  let _qrOpener = null;
  function openQRModal(opener) {
    _qrOpener = opener;
    dom.qrModal.showModal();
    document.body.style.overflow = 'hidden';
    dom.closeModal.focus();
  }
  function closeQRModal() {
    dom.qrModal.close();
    document.body.style.overflow = '';
    if (_qrOpener) { _qrOpener.focus(); _qrOpener = null; }
  }

  /* ============================================================
     MODAL – ITEM DETAIL
  ============================================================ */
  function openItemModal(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const isAr = state.lang === 'ar';
    const name = isAr ? item.ar : item.en;
    const desc = isAr ? (item.descAr || item.descEn) : item.descEn;
    const imgSrc = IMG_BASE + item.img;

    dom.itemImgWrapper.innerHTML = `<img src="${imgSrc}" alt="${name}" style="max-width:100%; max-height:70vh; object-fit:contain;">`;
    dom.itemModalTitle.textContent = name;
    dom.itemModalPrice.textContent = `${item.price} ${CURRENCY}`;
    dom.itemModalDesc.textContent = desc;
    dom.itemModalCal.textContent = item.cal;
    dom.itemModalDiet.innerHTML = item.diet.map(d => `<span class="diet-dot" data-diet="${d}" title="${d}"></span>`).join('');
    dom.itemModal.showModal();
    document.body.style.overflow = 'hidden';
  }
  function closeItemModal() {
    dom.itemModal.close();
    document.body.style.overflow = '';
  }

  /* ============================================================
     HERO IMAGE
  ============================================================ */
  function initHero() {
    const imgUrl = IMG_BASE + 'Carrotslice.jfif';
    const probe = new Image();
    probe.onload = () => {
      dom.heroBg.style.backgroundImage = `url('${imgUrl}')`;
      dom.heroBg.classList.add('loaded');
    };
    probe.onerror = () => {
      dom.heroBg.classList.add('loaded');
    };
    probe.src = imgUrl;
  }

  /* ============================================================
     PWA / SERVICE WORKER
  ============================================================ */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.warn('SW registration failed:', err));
    }
  }

  /* ============================================================
     EVENTS
  ============================================================ */
  function debounce(fn, delay) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); };
  }

  function bindEvents() {
    dom.langToggle.addEventListener('click', () => setState({ lang: state.lang === 'en' ? 'ar' : 'en' }));
    dom.themeToggle.addEventListener('click', () => setState({ dark: !state.dark }));

    dom.categoryScroller.addEventListener('click', e => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;
      clearTimeout(applyFilter._t);
      dom.categoryScroller.querySelectorAll('.cat-pill').forEach(p => {
        p.classList.toggle('active', p === pill);
        p.setAttribute('aria-pressed', p === pill);
      });
      setState({ category: pill.dataset.cat });
    });

    dom.searchInput.addEventListener('input', debounce(e => setState({ search: e.target.value }), 220));
    dom.searchClear.addEventListener('click', () => {
      clearTimeout(applyFilter._t);
      dom.searchInput.value = '';
      dom.searchInput.focus();
      setState({ search: '' });
    });

    const scrollToMenu = () => document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
    dom.viewMenuBtn.addEventListener('click', scrollToMenu);
    dom.mobileFab.addEventListener('click', scrollToMenu);

    dom.qrBtn.addEventListener('click', () => openQRModal(dom.qrBtn));
    dom.herQrBtn.addEventListener('click', () => openQRModal(dom.herQrBtn));
    dom.closeModal.addEventListener('click', closeQRModal);
    dom.qrModal.addEventListener('click', (e) => { if (e.target === dom.qrModal) closeQRModal(); });
    dom.qrModal.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (_qrOpener) { _qrOpener.focus(); _qrOpener = null; }
    });

    dom.itemCloseModal.addEventListener('click', closeItemModal);
    dom.itemModal.addEventListener('click', (e) => { if (e.target === dom.itemModal) closeItemModal(); });
    dom.itemModal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });

    dom.menuGrid.addEventListener('click', e => {
      const card = e.target.closest('.menu-card');
      if (!card) return;
      openItemModal(card.dataset.id);
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    applyTheme();
    initHeroTitle();
    buildAllCards();
    buildCategoryPills();
    buildTicker();
    applyLanguage();
    bindEvents();
    initObservers();
    initCursor();
    initNavScroll();
    initCardTilt();
    initImageErrorHandler();
    initHero();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
