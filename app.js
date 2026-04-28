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

  const DIET_LABELS = {
    'vegan':          'Vegan',
    'gluten-free':    'Gluten Free',
    'contains-dairy': 'Contains Dairy',
    'contains-nuts':  'Contains Nuts',
    'vegetarian':     'Vegetarian',
  };

  const MENU_ITEMS = [
    {id:'brew1', cat:'brewed',    en:'Classic Turkish Coffee',          ar:'قهوة تركية كلاسيكية',       descEn:'Finely ground coffee brewed in copper cezve, served with a dense velvety foam.',              descAr:'قهوة تركية مطحونة ناعماً تُحضر في كنكة نحاسية وتقدم برغوة كثيفة.', price:28, img:'TurkishCoffee.jfif',          cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew2', cat:'brewed',    en:'Double Turkish Coffee',           ar:'قهوة تركية مزدوجة',          descEn:'Double the intensity of our classic Turkish coffee — a bolder, deeper flavour.',                descAr:'ضعف كمية القهوة التركية للحصول على نكهة أقوى وأعمق.', price:40, img:'TurkishCoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew3', cat:'brewed',    en:'Ottoman Mastic Coffee',           ar:'قهوة عثمانية بالمستيك',      descEn:'Premium coffee enriched with aromatic mastic resin for a uniquely Ottoman flavour.',            descAr:'قهوة ممتازة مخلوطة بالمستكة العطرية لمنحها طعماً عثمانياً فريداً.', price:28, img:'Ottomanmastica.jfif',         cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:'bestseller'},
    {id:'brew4', cat:'brewed',    en:'Hazelnut Turkish Coffee',         ar:'قهوة تركية بالبندق',         descEn:'Classic Turkish coffee blended with rich roasted hazelnut flavour.',                           descAr:'قهوة تركية كلاسيكية مدمجة مع نكهة البندق المحمص الفاخرة.', price:28, img:'Ottomancoffee.jfif',          cal:'20 kcal', diet:[],                                                badge:'limited',  outOfStock:true},
    {id:'brew5', cat:'brewed',    en:'Cardamom Turkish Coffee',         ar:'قهوة تركية بالهيل',          descEn:'Classic Turkish coffee infused with aromatic green cardamom.',                                 descAr:'قهوة تركية معطرة بالهيل الأخضر العطري.', price:28, img:'Ottomancardamom.jfif',        cal:'5 kcal',  diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew6', cat:'brewed',    en:'Sahlep',                          ar:'سحلب',                       descEn:'Ancient Anatolian comfort drink made from orchid powder and warm milk.',                       descAr:'شراب دفء الأناضول القديم مصنوع من مسحوق الأوركيد والحليب.', price:38, img:'Sahlep.jfif',                cal:'200 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'brew7', cat:'brewed',    en:'Arabic Coffee — Full Dalla',      ar:'قهوة عربية – دلة كاملة',     descEn:'A ceremonial full dalla of premium Arabic coffee, perfect for group sharing.',                  descAr:'دلة كاملة من القهوة العربية الفاخرة، مثالية للتقديم الجماعي.', price:90, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew8', cat:'brewed',    en:'Arabic Coffee — Half Dalla',      ar:'قهوة عربية – نصف دلة',       descEn:'Half-serving of ceremonial Arabic coffee.',                                                    descAr:'نصف دلة من القهوة العربية الأصيلة.', price:55, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'brew9', cat:'brewed',    en:'Arabic Coffee — Cup',             ar:'قهوة عربية – فنجان',         descEn:'Personal serving of authentic Arabic coffee.',                                                 descAr:'فنجان شخصي من القهوة العربية الأصيلة.', price:35, img:'Arabiccoffee.jfif',          cal:'10 kcal', diet:['vegan','gluten-free'],                           badge:null},
    {id:'tea1',  cat:'tea',       en:'Turkish Tea',                     ar:'شاي تركي',                   descEn:'Deep amber Rize tea served in a traditional tulip glass.',                                    descAr:'شاي ريزا التركي العميق بلون الكهرمان، يقدم في كأس تقليدي.', price:15, img:'Turkishtea.jfif',            cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea2',  cat:'tea',       en:'Turkish Tea Pot',                 ar:'إبريق شاي تركي',             descEn:'A generous pot of premium Rize tea for sharing.',                                             descAr:'إبريق كبير من شاي ريزا التركي الفاخر.', price:45, img:'Teapot.jfif',               cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea3',  cat:'tea',       en:'Apple Tea Hot & Ice',             ar:'شاي التفاح',                 descEn:'Sun-ripened apple essence, served hot or iced.',                                              descAr:'جوهر التفاح الناضج تحت أشعة الشمس، يقدم ساخناً أو مثلجاً.', price:35, img:'Appletea.jfif',              cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea4',  cat:'tea',       en:'Mulberry Tea Hot & Ice',          ar:'شاي التوت',                  descEn:'White mulberry infusion, delicious hot or iced.',                                             descAr:'منقوع التوت الأبيض اللذيذ، ساخن أو مثلج.', price:35, img:'Mulberrytea.jfif',           cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea5',  cat:'tea',       en:'Lemon Mint',                      ar:'ليمون بالنعناع',             descEn:'Zesty freshly squeezed lemon and fresh garden mint.',                                         descAr:'ليمون معصور طازجاً ونعناع حديقة عطري.', price:35, img:'Lemonminttea.jfif',          cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea6',  cat:'tea',       en:'Pomegranate Tea Hot & Ice',       ar:'شاي الرمان',                 descEn:'Vibrant pomegranate infusion, served hot or iced.',                                           descAr:'منقوع رمان نابض بالحياة، ساخن أو مثلج.', price:35, img:'Pomegranatetea.jfif',        cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea7',  cat:'tea',       en:'Matcha Latte — Iced',             ar:'ماتشا لاتيه',                descEn:'Ceremonial-grade matcha whisked with milk.',                                                  descAr:'ماتشا احتفالية مخفوقة مع حليب.', price:36, img:'Matcha.jfif',               cal:'95 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea13', cat:'tea',       en:'Hibiscus Hot & Ice',              ar:'كركديه',                     descEn:'Ruby-red hibiscus infusion, refreshing hot or iced.',                                         descAr:'منقوع ياقوتي منعش ساخن أو مثلج.', price:36, img:'Hibiscustea.jfif',           cal:'25 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea15', cat:'tea',       en:'Winter Tea',                      ar:'شاي الشتاء',                 descEn:'A warming seasonal spice blend of cinnamon, ginger and clove.',                              descAr:'مزيج توابل شتوية دافئ من القرفة والزنجبيل والقرنفل.', price:38, img:'Wintertea.jfif',             cal:'30 kcal', diet:['vegan'],                                         badge:null},
    {id:'tea16', cat:'tea',       en:'Chamomile',                       ar:'شاي البابونج',               descEn:'Calming golden chamomile blossoms steeped to perfection.',                                   descAr:'بابونج ذهبي مهدئ.', price:36, img:'Chamomiletea.jfif',          cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'tea17', cat:'tea',       en:'Green Tea',                       ar:'شاي أخضر',                   descEn:'Pure, clean Japanese green tea with a delicate finish.',                                     descAr:'شاي أخضر ياباني نقي ونظيف.', price:36, img:'Greentea.jfif',              cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe1', cat:'cafe',      en:'Latte Hot & Ice',                 ar:'لاتيه',                      descEn:'Silky microfoam espresso latte, available hot or iced.',                                     descAr:'إسبريسو مع رغوة حليب ناعمة كالحرير.', price:29, img:'Latte.jfif',                cal:'170 kcal',diet:['contains-dairy'],                                badge:'bestseller'},
    {id:'cafe2', cat:'cafe',      en:'Cappuccino Hot & Ice',            ar:'كابوتشينو',                  descEn:'Equal thirds of espresso, steamed milk and dense foam.',                                     descAr:'ثلث إسبريسو، ثلث حليب، ثلث رغوة كثيفة.', price:29, img:'Cappuccino.jfif',            cal:'150 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe3', cat:'cafe',      en:'Spanish Latte Hot & Ice',         ar:'لاتيه إسباني',               descEn:'Espresso with sweetened condensed milk for a creamy finish.',                                 descAr:'إسبريسو مع حليب مكثف محلى لمسة كريمية.', price:32, img:'Latte.jfif',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe4', cat:'cafe',      en:'Salted Caramel Latte Hot & Ice',  ar:'لاتيه كراميل مملح',          descEn:'House-made caramel latte with a touch of sea salt.',                                         descAr:'لاتيه بكراميل منزلي الصنع مع لمسة ملح البحر.', price:32, img:'Latte.jfif',                cal:'230 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe5', cat:'cafe',      en:'Vanilla Latte Hot & Ice',         ar:'لاتيه فانيليا',              descEn:'Madagascar bourbon vanilla in a creamy latte.',                                              descAr:'فانيليا بوربون مدغشقر في لاتيه كريمي.', price:32, img:'Latte.jfif',                cal:'220 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe6', cat:'cafe',      en:'Hazelnut Latte Hot & Ice',        ar:'لاتيه البندق',               descEn:'Roasted hazelnut syrup in a rich latte.',                                                    descAr:'شراب البندق المحمص في لاتيه غني.', price:32, img:'Latte.jfif',                cal:'180 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe9', cat:'cafe',      en:'White Mocha Hot & Ice',           ar:'وايت موكا',                  descEn:'White chocolate blended with espresso and milk.',                                            descAr:'شوكولاتة بيضاء ممزوجة بالإسبريسو والحليب.', price:32, img:'Latte.jfif',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe10',cat:'cafe',      en:'Mocha Hot & Ice',                 ar:'موكا',                       descEn:'Dark chocolate and bold espresso in harmony.',                                               descAr:'شوكولاتة داكنة وإسبريسو قوي.', price:32, img:'Latte.jfif',                cal:'260 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe11',cat:'cafe',      en:'Flat White Hot & Ice',            ar:'فلات وايت',                  descEn:'Double ristretto with silky velvety milk.',                                                  descAr:'إسبريسو مزدوج مع حليب مخملي ناعم.', price:27, img:'Flatwhite.jfif',             cal:'140 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe14',cat:'cafe',      en:'Espresso Macchiato',              ar:'ماكياتو',                    descEn:'Espresso marked with a delicate touch of milk foam.',                                        descAr:'إسبريسو مع لمسة من رغوة الحليب.', price:24, img:'Latte.jfif',                cal:'60 kcal', diet:['contains-dairy'],                                badge:null},
    {id:'cafe15',cat:'cafe',      en:'Espresso Single',                 ar:'إسبريسو مفرد',               descEn:'Pure concentrated espresso shot.',                                                           descAr:'جرعة إسبريسو مركزة نقية.', price:18, img:'Espresso.jfif',              cal:'3 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe17',cat:'cafe',      en:'Americano Hot & Ice',             ar:'أمريكانو',                   descEn:'Espresso pulled long with hot water for a clean, smooth cup.',                               descAr:'إسبريسو ممتد بالماء الساخن.', price:21, img:'Americano.jfif',             cal:'5 kcal',  diet:['vegan'],                                         badge:null},
    {id:'cafe18',cat:'cafe',      en:'Hot Chocolate',                   ar:'هوت شوكولاتة',               descEn:'Artisanal dark cocoa dissolved in warm steamed milk.',                                       descAr:'كاكاو داكن حرفي مذاب في الحليب الدافئ.', price:36, img:'Latte.jfif',                cal:'360 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe19',cat:'cafe',      en:'Piccolo Latte',                   ar:'بيكولو لاتيه',               descEn:'A small, intense latte with a ristretto shot and silky milk.',                               descAr:'لاتيه صغير وقوي بجرعة ريستريتو.', price:26, img:'Piccololatte.jfif',        cal:'110 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'cafe20',cat:'cafe',      en:'Pistachio Latte',                 ar:'لاتيه الفستق',               descEn:'Creamy latte infused with real pistachio butter for a nutty indulgence.',                    descAr:'لاتيه كريمي مع زبدة الفستق الحقيقية.', price:34, img:'Pistachiolatte.jfif',       cal:'190 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'cafe21',cat:'cafe',      en:'Tiramisu Latte',                  ar:'لاتيه تيراميسو',             descEn:'Dessert in a cup — mascarpone, espresso and a cocoa dusting.',                               descAr:'حلى في فنجان: ماسكاربوني، إسبريسو وكاكاو.', price:34, img:'Tiramisulatte.jfif',        cal:'190 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'spec1', cat:'specialty', en:'V60 Pour Over',                   ar:'V60 بور أوفر',               descEn:'Single origin specialty beans brewed by hand with the V60 pour-over method.',                 descAr:'حبوب قهوة مختصة تُحضر بالتقطير اليدوي.', price:33, img:'V60.webp',                  cal:'2 kcal',  diet:['vegan'],                                         badge:'signature'},
    {id:'spec2', cat:'specialty', en:'Ice Drip',                        ar:'آيس دريب',                   descEn:'8-hour cold drip extraction — ultra-clear, ultra-delicate.',                                 descAr:'استخلاص بطيء بالتنقيط على الثلج لمدة 8 ساعات.', price:35, img:'Icedrip.jpg',               cal:'2 kcal',  diet:['vegan'],                                         badge:'signature'},
    {id:'spec3', cat:'specialty', en:'Cold Brew',                       ar:'كولد برو',                   descEn:'18+ hour cold steep for an ultra-smooth, low-acid coffee concentrate.',                     descAr:'نقع بارد لأكثر من 18 ساعة لقهوة ناعمة كالحرير.', price:37, img:'Coldbrew.webp',              cal:'2 kcal',  diet:['vegan'],                                         badge:'bestseller'},
{id:'ref16', cat:'refreshers',en:'Lemonade',                        ar:'ليمونادة',                   descEn:'Zesty freshly squeezed lemon drink, chilled and refreshing.',                                descAr:'مشروب ليمون منعش.', price:37, img:'Lemonade.png',               cal:'120 kcal',diet:[],                                                 badge:null},{id:'ref15', cat:'refreshers',en:'Orange Juice',                    ar:'عصير برتقال',                descEn:'Freshly squeezed orange juice, nothing added.',                                              descAr:'عصير برتقال طازج معصور.', price:37, img:'Orangejuice.png',            cal:'110 kcal',diet:[],                                                 badge:null},    {id:'ref10', cat:'refreshers',en:'Cooling Breeze',                  ar:'نسيم منعش',                  descEn:'A chilled blend of citrus and refreshing herbs.',                                            descAr:'مزيج مثلج من الحمضيات والأعشاب المنعشة.', price:45, img:'Coolingbreeze.jfif',         cal:'150 kcal',diet:[],                                                 badge:null},
    {id:'ref3',  cat:'refreshers',en:'Orange Earl Grey',                ar:'برتقال إيرل جراي',           descEn:'Citrus and bergamot duet in an Earl Grey base.',                                             descAr:'دوئية البرغموت والحمضيات في شاي إيرل جراي.', price:47, img:'Orangeearlygreytea.png',     cal:'2 kcal',  diet:['vegan'],                                         badge:null},
    {id:'ref6',  cat:'refreshers',en:'Blue Lagoon',                     ar:'موهيتو توت أزرق',            descEn:'Wild blueberries with fresh mint and a squeeze of lemon.',                                  descAr:'توت بري مع نعناع طازج ولمسة ليمون.', price:38, img:'Bluelagoon.jfif',            cal:'150 kcal',diet:[],                                                 badge:null},
    {id:'ref7',  cat:'refreshers',en:'Strawberry Mojito',               ar:'موهيتو فراولة',              descEn:'Fresh strawberries muddled with mint and lime.',                                             descAr:'فراولة طازجة مدقوقة مع النعناع.', price:42, img:'Strawberrymojito.png',       cal:'170 kcal',diet:[],                                                 badge:null},
    {id:'ref13a',cat:'refreshers',en:'Still Water (Small)',              ar:'مياه عادية (صغير)',          descEn:'Pure still water, small.',                                                                   descAr:'مياه نقية طبيعية، صغيرة.', price:11, img:'Stillwater.jfif',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref14', cat:'refreshers',en:'Still Water (Large)',              ar:'مياه عادية (كبير)',          descEn:'Pure still water, large.',                                                                   descAr:'مياه نقية طبيعية، كبيرة.', price:21, img:'Stillwater.jfif',            cal:'0 kcal',  diet:[],                                                 badge:null},
    {id:'ref12a',cat:'refreshers',en:'Sparkling Water',                 ar:'مياه غازية',                 descEn:'Naturally carbonated sparkling water.',                                                      descAr:'مياه غازية طبيعية.', price:23, img:'Sparklingwater.jpg',         cal:'0 kcal',  diet:['vegan'],                                         badge:null},
    {id:'bak1',  cat:'baklava',   en:'Baklava Mix',                     ar:'بقلاوة مشكلة',               descEn:'A stunning assortment of Ottoman baklava filled with premium nuts.',                         descAr:'تشكيلة مذهلة من البقلاوة العثمانية المحشوة بالمكسرات.', price:65, img:'Mixbaklava.jfif',            cal:'450 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak2',  cat:'baklava',   en:'Carrot Slice Baklava',            ar:'بقلاوة جزر',                 descEn:'Traditional Ottoman carrot-shaped baklava filled with premium pistachios.',                   descAr:'بقلاوة جزر عثمانية تقليدية محشوة بالمكسرات.', price:45, img:'Carrotslice.jfif',           cal:'420 kcal',diet:['contains-nuts'],                                 badge:'signature'},
    {id:'bak3',  cat:'baklava',   en:'Carrot Baklava with Ice Cream',   ar:'بقلاوة جزر مع آيس كريم',    descEn:'Warm carrot baklava served with a scoop of vanilla ice cream.',                               descAr:'بقلاوة جزر دافئة تقدم مع آيس كريم.', price:55, img:'Carrotslicewithicecream.jfif',cal:'620 kcal',diet:['contains-nuts','contains-dairy'],               badge:'bestseller'},
    {id:'bak4',  cat:'baklava',   en:'Trio Baklava',                    ar:'تريو بقلاوة',                descEn:'Three distinct baklava styles on one plate.',                                                descAr:'ثلاث قطع من البقلاوة بأشكال مختلفة.', price:45, img:'Triobaklava.jfif',            cal:'480 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'bak13', cat:'baklava',   en:'Kunafa',                          ar:'كنافة',                      descEn:'Shredded kataifi pastry with rich cream cheese, soaked in blossom syrup.',                  descAr:'كنافة شعر مقرمشة محشوة بالجبن الكريمي.', price:45, img:'Kunafa.jfif',               cal:'520 kcal',diet:['contains-dairy'],                                badge:'signature'},
    {id:'bak14', cat:'baklava',   en:'Brownies',                        ar:'براونيز',                    descEn:'Dense, fudge-rich dark chocolate brownies.',                                                 descAr:'براونيز شوكولاتة داكنة غنية وفادحة.', price:55, img:'Brownies.jfif',              cal:'380 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak15', cat:'baklava',   en:'Honey Cake',                      ar:'كيكة العسل',                 descEn:'Soft layered honey cake with a rich cream filling.',                                         descAr:'كيكة عسل طرية بطبقات.', price:45, img:'Honeycake.png',              cal:'520 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak16', cat:'baklava',   en:'Tiramisu',                        ar:'تيراميسو',                   descEn:'Classic Italian tiramisu with layers of ladyfinger biscuit and cream.',                     descAr:'تيراميسو كلاسيكي بطبقات البسكويت والكريمة.', price:45, img:'Tiramisu.png',               cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak17', cat:'baklava',   en:'Mango Cake',                      ar:'كيكة المانجو',               descEn:'Light sponge cake layered with fresh mango pieces and cream.',                               descAr:'كيك إسفنجي خفيف بقطع المانجو الطازجة.', price:45, img:'Mangocake.jfif',              cal:'450 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak18', cat:'baklava',   en:'Pistachio Cake',                  ar:'كيكة الفستق',                descEn:'Rich pistachio cake with layers of pistachio cream.',                                        descAr:'كيك فستق غني بطبقات كريمة الفستق.', price:45, img:'Pistachiocake.webp',         cal:'530 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'bak19', cat:'baklava',   en:'San Sebastian Cheesecake',        ar:'تشيزكيك سان سيباستيان',      descEn:'Burnt Basque cheesecake — caramelised top, creamy centre.',                                  descAr:'تشيز كيك باسك محروق الوجه، طري من الداخل.', price:45, img:'Sansebastian.jfif',           cal:'480 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak20', cat:'baklava',   en:'Fanzuella Sweet',                 ar:'فانزويلا سويت',              descEn:'Sweet creamy dessert with a touch of premium nuts.',                                         descAr:'حلى كريمي حلو مع لمسة مكسرات.', price:45, img:'Fanzuella.jfif',              cal:'350 kcal',diet:['contains-dairy','contains-nuts'],               badge:null},
    {id:'bak21', cat:'baklava',   en:'Trileche',                        ar:'تريليتشي',                   descEn:'Soft sponge soaked in three kinds of milk — a silky, indulgent dessert.',                   descAr:'كيك إسفنجي منقوع بثلاثة أنواع حليب.', price:45, img:'Trileche.jfif',               cal:'400 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'bak22', cat:'baklava', en:'Red Velvet', ar:'ريد فيلفيت', descEn:'Soft, moist red velvet sponge layered with creamy frosting.', descAr:'كيك ريد فيلفيت ناعم مع كريمة.', price:45, img:'Redvelvet.jfif', cal:'420 kcal', diet:['contains-dairy'], badge:null},
    {id:'bak23', cat:'baklava', en:'Chocolate Mousse Cake', ar:'كيك موس شوكولاتة', descEn:'Light and airy chocolate mousse with a rich cocoa finish.', descAr:'كيك موس شوكولاتة خفيف وغني.', price:45, img:'Moussecake.png', cal:'380 kcal', diet:['contains-dairy'], badge:null},
    {id:'bak24', cat:'baklava', en:'Dark Forest Cake', ar:'دارك فورست', descEn:'Chocolate sponge layered with cherries and cream.', descAr:'كيك شوكولاتة مع كرز وكريمة.', price:45, img:'Darkforest.png', cal:'450 kcal', diet:['contains-dairy'], badge:null},
    {id:'bak25', cat:'baklava', en:'Dark Chocolate Cake', ar:'شوكولاتة داكنة', descEn:'Rich dark chocolate layered cake with intense cocoa flavor.', descAr:'كيك شوكولاتة داكنة غني.', price:45, img:'Darkchocolate.jfif', cal:'430 kcal', diet:['contains-dairy'], badge:null},
    {id:'snack01',cat:'snacks',   en:'Turkish Ice Cream',               ar:'آيس كريم تركي',              descEn:'Classic stretchy dondurma ice cream — served with a theatrical flourish.',                  descAr:'دوندورما تركية كلاسيكية قابلة للمط.', price:27, img:'Icecreamcup.jfif',            cal:'210 kcal',diet:['contains-dairy'],                                badge:null},
    {id:'snack1',cat:'snacks',    en:'Nuts Stand — Tall',               ar:'مكسرات – ستاند كبير',        descEn:'Premium roasted nuts presented in a tall display stand.',                                    descAr:'مكسرات فاخرة محمصة تقدم في ستاند كبير.', price:99, img:'Tallnuts.jfif',               cal:'300 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'snack2',cat:'snacks',    en:'Nuts Stand — Small',              ar:'مكسرات – ستاند صغير',        descEn:'Curated premium roasted nuts in a small display stand.',                                    descAr:'مكسرات فاخرة محمصة تقدم في ستاند صغير.', price:60, img:'Smallnuts.jfif',              cal:'180 kcal',diet:['contains-nuts'],                                 badge:null},
    {id:'cro1',  cat:'croissant', en:'Plain Butter Croissant',          ar:'كرواسون زبدة',               descEn:'Classic Parisian all-butter croissant, flaky and golden.',                                   descAr:'كرواسون زبدة باريسي كلاسيكي.', price:20, img:'Plainbuttercroissant.jfif',  cal:'320 kcal',diet:['vegetarian'],                                    badge:'signature'},
    {id:'cro2',  cat:'croissant', en:'Cheese Croissant',                ar:'كرواسون جبن',                descEn:'Flaky buttery croissant filled with melted cheese.',                                         descAr:'كرواسون زبدة محشو بالجبنة.', price:20, img:'Cheesecroissant.jfif',        cal:'360 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro3',  cat:'croissant', en:'Chocolate Croissant',             ar:'كرواسون شوكولاتة',           descEn:'Buttery laminated pastry filled with dark chocolate.',                                       descAr:'كرواسون زبدة محشو بالشوكولاتة.', price:20, img:'Chocolatecroissant.jfif',      cal:'380 kcal',diet:['vegetarian'],                                    badge:null},
    {id:'cro4',  cat:'croissant', en:'Almond Croissant',                ar:'كرواسون لوز',                descEn:'Croissant filled with almond frangipane cream and topped with flaked almonds.',             descAr:'كرواسون محشو بكريمة اللوز.', price:20, img:'Almondcroissant.jfif',        cal:'400 kcal',diet:['vegetarian','contains-nuts'],                   badge:null},
    {id:'cro5',  cat:'croissant', en:'Cinnamon Danish',                 ar:'دانش قرفة',                  descEn:'Cinnamon sugar spiral danish, soft and fragrant.',                                          descAr:'دانش قرفة وسكر بشكل حلزوني.', price:20, img:'Cinnamondanish.jfif',        cal:'390 kcal',diet:['vegetarian'],                                    badge:null},
  ];

  const ITEM_MAP = Object.fromEntries(MENU_ITEMS.map(item => [item.id, item]));

  /* ============================================================
     I18N
  ============================================================ */
  const I18N = {
    en: {
      tagline:'Luxury in Every Sip of Tradition', eyebrow:'Est. Ottoman Heritage',
      viewMenu:'View Menu', backToHome:'Home',
      aboutLabel:'Our Heritage', menuLabel:'Selections',
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
      viewMenu:'عرض القائمة', backToHome:'الرئيسية',
      aboutLabel:'تراثنا', menuLabel:'التشكيلة',
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
    if (CATEGORIES.some(c => c.key === catFromHash)) state.category = catFromHash;
  }

  function setState(partial) {
    const prev = { ...state };
    Object.assign(state, partial);
    if ('lang' in partial && partial.lang !== prev.lang) applyLanguage();
    if ('dark' in partial && partial.dark !== prev.dark) applyTheme();
    if ('category' in partial || 'search' in partial) applyFilter();
    if ('lang' in partial) localStorage.setItem('tk-lang', state.lang);
    if ('dark' in partial) localStorage.setItem('tk-dark', state.dark);
    if ('category' in partial) {
      if (state.category === 'all') history.replaceState(null, '', window.location.pathname);
      else history.replaceState(null, '', '#category=' + state.category);
    }
  }

  /* ============================================================
     SAFE DOM HELPER — never throws, warns once in dev
  ============================================================ */
  function safeEl(id) {
    const el = document.getElementById(id);
    if (!el && typeof console !== 'undefined') {
      console.warn(`[Turkiana] DOM element #${id} not found — skipping.`);
    }
    return el || nullProxy();
  }

  function nullProxy() {
    return new Proxy({}, {
      get(_, prop) {
        if (prop === 'classList') return { toggle:()=>{}, add:()=>{}, remove:()=>{}, contains:()=>false };
        if (prop === 'querySelectorAll') return () => [];
        if (prop === 'querySelector') return () => null;
        if (prop === 'setAttribute') return () => {};
        if (prop === 'removeAttribute') return () => {};
        if (prop === 'addEventListener') return () => {};
        if (prop === 'focus') return () => {};
        if (prop === 'showModal') return () => {};
        if (prop === 'close') return () => {};
        if (prop === 'style') return {};
        return () => {};
      },
      set() { return true; },
    });
  }

  /* ============================================================
     DOM REFS — all via safeEl so missing elements never crash
  ============================================================ */
  const dom = {
    html:             document.documentElement,
    mainNav:          safeEl('mainNav'),
    cursor:           safeEl('cursor'),
    cursorRing:       safeEl('cursorRing'),
    heroTitle:        safeEl('heroTitle'),
    heroTagline:      safeEl('heroTagline'),
    heroEyebrow:      safeEl('heroEyebrow'),
    heroBg:           safeEl('heroBg'),
    landing:          safeEl('landing'),
    menuPage:         safeEl('menuPage'),
    navBackBtn:       safeEl('navBackBtn'),
    viewMenuBtn:      safeEl('viewMenuBtn'),
    viewMenuLabel:    safeEl('viewMenuLabel'),
    tickerTrack:      safeEl('tickerTrack'),
    aboutLabel:       safeEl('aboutLabel'),
    aboutCaption:     safeEl('aboutCaption'),
    aboutP1:          safeEl('aboutP1'),
    aboutP2:          safeEl('aboutP2'),
    statLabel1:       safeEl('statLabel1'),
    statLabel2:       safeEl('statLabel2'),
    statLabel3:       safeEl('statLabel3'),
    menuLabel:        safeEl('menuLabel'),
    categoryScroller: safeEl('categoryScroller'),
    searchInput:      safeEl('searchInput'),
    searchClear:      safeEl('searchClear'),
    resultCount:      safeEl('resultCount'),
    menuGrid:         safeEl('menuGrid'),
    emptyState:       safeEl('emptyState'),
    emptyTitle:       safeEl('emptyTitle'),
    emptySub:         safeEl('emptySub'),
    liveRegion:       safeEl('liveRegion'),
    langToggle:       safeEl('langToggle'),
    themeToggle:      safeEl('themeToggle'),
    themeIcon:        safeEl('themeIcon'),
    qrBtn:            safeEl('qrBtn'),
    herQrBtn:         safeEl('herQrBtn'),
    qrModal:          safeEl('qrModal'),
    closeModal:       safeEl('closeModal'),
    closeModalLabel:  safeEl('closeModalLabel'),
    itemModal:        safeEl('itemModal'),
    itemImgWrapper:   safeEl('itemImgWrapper'),
    itemModalTitle:   safeEl('itemModalTitle'),
    itemModalPrice:   safeEl('itemModalPrice'),
    itemModalDesc:    safeEl('itemModalDesc'),
    itemModalCal:     safeEl('itemModalCal'),
    itemModalDiet:    safeEl('itemModalDiet'),
    itemCloseModal:   safeEl('itemCloseModal'),
    itemCloseLabel:   safeEl('itemCloseLabel'),
    mobileFab:        safeEl('mobileFab'),
    fabLabel:         safeEl('fabLabel'),
    footerTagline:    safeEl('footerTagline'),
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
    const dietDots = item.diet.map(d =>
      `<span class="diet-dot" data-diet="${d}" aria-label="${DIET_LABELS[d] || d}"></span>`
    ).join('');

    return `
      <article
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
            src="${IMG_BASE}${item.img}"
            alt="${name}"
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
          >
          <div class="card-img-fallback" aria-hidden="true">
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
              <div class="card-diet-icons" aria-label="Dietary information">${dietDots}</div>
            </div>
          </div>
        </div>
      </article>`;
  }

  function buildAllCards() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    const frag = document.createDocumentFragment();
    const tmp = document.createElement('div');
    MENU_ITEMS.forEach(item => {
      tmp.innerHTML = buildCardHTML(item);
      frag.appendChild(tmp.firstElementChild);
    });
    grid.innerHTML = '';
    grid.appendChild(frag);
    grid.classList.remove('is-loading');
    grid.removeAttribute('aria-busy');
    // Trigger image shimmer tracking after cards are built
    initImageShimmerObserver();
  }

  function buildCategoryPills() {
    const isAr = state.lang === 'ar';
    const scrollerEl = document.getElementById('categoryScroller');
    if (!scrollerEl) return;
    const frag = document.createDocumentFragment();
    const tmp = document.createElement('div');
    CATEGORIES.forEach(cat => {
      const active = cat.key === state.category;
      tmp.innerHTML = `<button class="cat-pill${active ? ' active' : ''}" data-cat="${cat.key}" aria-pressed="${active}" type="button">${isAr ? cat.ar : cat.en}</button>`;
      frag.appendChild(tmp.firstElementChild);
    });
    scrollerEl.innerHTML = '';
    scrollerEl.appendChild(frag);
  }

  function buildTicker() {
    const trackEl = document.getElementById('tickerTrack');
    if (!trackEl) return;
    const items = MENU_ITEMS.filter(i => i.badge);
    const source = items.length > 0 ? items : MENU_ITEMS.slice(0, 6);
    const isAr = state.lang === 'ar';
    const labels = source.map(i => `
      <span class="ticker-item">
        <span class="ticker-dot" aria-hidden="true"></span>
        ${isAr ? i.ar : i.en}
        <span class="ticker-dot" aria-hidden="true"></span>
        ${i.price} ${CURRENCY}
      </span>`).join('');
    trackEl.innerHTML = labels + labels;
  }

  function updateCardTexts() {
    const isAr = state.lang === 'ar';
    const catMap = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.querySelectorAll('.menu-card').forEach(card => {
      const item = ITEM_MAP[card.dataset.id];
      if (!item) return;
      const newName = isAr ? item.ar : item.en;
      const newDesc = isAr ? (item.descAr || item.descEn) : item.descEn;
      const nameEl = card.querySelector('[data-field="name"]');
      const descEl = card.querySelector('[data-field="desc"]');
      const overlayDesc = card.querySelector('.card-overlay-desc');
      const catEl = card.querySelector('.card-category');
      if (nameEl) nameEl.textContent = newName;
      if (descEl) descEl.textContent = newDesc;
      if (overlayDesc) overlayDesc.textContent = newDesc;
      card.setAttribute('aria-label', `${newName}, ${item.price} ${CURRENCY}${item.outOfStock ? ', currently unavailable' : ''}`);
      if (catEl) {
        const cd = catMap[item.cat];
        catEl.textContent = isAr ? cd?.ar : cd?.en;
      }
    });
    const heroTitleEl = document.getElementById('heroTitle');
    const navBrand = document.querySelector('.nav-brand');
    if (isAr) {
      if (heroTitleEl) heroTitleEl.setAttribute('lang', 'en');
      if (navBrand) navBrand.setAttribute('lang', 'en');
    } else {
      if (heroTitleEl) heroTitleEl.removeAttribute('lang');
      if (navBrand) navBrand.removeAttribute('lang');
    }
  }

  /* ============================================================
     FILTER
  ============================================================ */
  let filterRafId = null;
  function applyFilter() {
    if (filterRafId) cancelAnimationFrame(filterRafId);
    filterRafId = requestAnimationFrame(_doFilter);
  }
  function _doFilter() {
    filterRafId = null;
    const term = state.search.toLowerCase().trim();
    const cat = state.category;
    const isAr = state.lang === 'ar';
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.menu-card');
    let visible = 0;
    cards.forEach(card => {
      const item = ITEM_MAP[card.dataset.id];
      if (!item) return;
      const textField = isAr
        ? (item.ar + ' ' + (item.descAr || item.descEn))
        : (item.en + ' ' + item.descEn);
      const show = (cat === 'all' || item.cat === cat) && (!term || textField.toLowerCase().includes(term));
      card.dataset.hidden = show ? 'false' : 'true';
      if (show) visible++;
    });
    const t = I18N[state.lang];
    const emptyEl = document.getElementById('emptyState');
    if (emptyEl) emptyEl.classList.toggle('visible', visible === 0);
    const countText = `${visible} ${visible === 1 ? t.resultSingular : t.resultPlural}`;
    const resultCountEl = document.getElementById('resultCount');
    if (resultCountEl) resultCountEl.textContent = countText;
    const searchClearEl = document.getElementById('searchClear');
    if (searchClearEl) searchClearEl.classList.toggle('visible', state.search.length > 0);
    clearTimeout(applyFilter._liveT);
    applyFilter._liveT = setTimeout(() => {
      const lr = document.getElementById('liveRegion');
      if (lr) lr.textContent = countText;
    }, 600);
    grid.classList.remove('is-loading');
  }
  applyFilter._liveT = null;

  /* ============================================================
     LANGUAGE
  ============================================================ */
  function applyLanguage() {
    const lang = state.lang;
    const isAr = lang === 'ar';
    const t = I18N[lang];
    dom.html.lang = lang;
    dom.html.dir = isAr ? 'rtl' : 'ltr';
    dom.heroTagline.textContent   = t.tagline;
    dom.heroEyebrow.textContent   = t.eyebrow;
    dom.viewMenuLabel.textContent = t.viewMenu;
    dom.footerTagline.textContent = t.footerTagline;
    dom.langToggle.setAttribute('aria-label', t.langLabel);
    dom.menuLabel.textContent     = t.menuLabel;
    const searchInputEl = document.getElementById('searchInput');
    if (searchInputEl) searchInputEl.placeholder = t.searchPlaceholder;
    const emptyTitleEl = document.getElementById('emptyTitle');
    if (emptyTitleEl) emptyTitleEl.textContent = t.emptyTitle;
    const emptySubEl = document.getElementById('emptySub');
    if (emptySubEl) emptySubEl.textContent = t.emptySub;
    dom.closeModalLabel.textContent = t.closeModal;
    dom.itemCloseLabel.textContent  = t.itemCloseLabel;
    dom.aboutLabel.textContent   = t.aboutLabel;
    dom.aboutCaption.textContent = t.aboutCaption;
    dom.aboutP1.textContent      = t.aboutP1;
    dom.aboutP2.textContent      = t.aboutP2;
    dom.statLabel1.textContent   = t.statLabel1;
    dom.statLabel2.textContent   = t.statLabel2;
    dom.statLabel3.textContent   = t.statLabel3;
    const menuPageEl = document.getElementById('menuPage');
    dom.fabLabel.textContent = (menuPageEl && !menuPageEl.classList.contains('hidden'))
      ? t.backToHome
      : t.viewMenu;
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
     PAGE SWITCHING
  ============================================================ */
  function showMenuPage() {
    const landingEl = document.getElementById('landing');
    const menuPageEl = document.getElementById('menuPage');
    if (!menuPageEl) return;
    if (landingEl) landingEl.style.display = 'none';
    menuPageEl.classList.remove('hidden');
    document.body.classList.add('menu-page-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    dom.fabLabel.textContent = I18N[state.lang].backToHome;
    const navBrand = dom.mainNav.querySelector && dom.mainNav.querySelector('.nav-brand');
    if (navBrand) navBrand.removeAttribute('aria-current');
  }

  function showLandingPage() {
    const landingEl = document.getElementById('landing');
    const menuPageEl = document.getElementById('menuPage');
    if (!menuPageEl) return;
    menuPageEl.classList.add('hidden');
    if (landingEl) landingEl.style.display = 'block';
    document.body.classList.remove('menu-page-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    dom.fabLabel.textContent = I18N[state.lang].viewMenu;
    const navBrand = dom.mainNav.querySelector && dom.mainNav.querySelector('.nav-brand');
    if (navBrand) navBrand.setAttribute('aria-current', 'page');
  }

  /* ============================================================
     CUSTOM CURSOR
  ============================================================ */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(prefers-contrast: more)').matches) return;
    const cursorEl    = document.getElementById('cursor');
    const cursorRingEl = document.getElementById('cursorRing');
    if (!cursorEl || !cursorRingEl) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorEl.style.left = mx + 'px';
      cursorEl.style.top  = my + 'px';
    });
    (function animateRing() {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      cursorRingEl.style.left = rx + 'px';
      cursorRingEl.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();
    document.body.classList.add('cursor-ready');
    document.addEventListener('mouseover', e => {
      const interactive = e.target.closest('button, a, input, .menu-card, .cat-pill');
      cursorEl.classList.toggle('is-hovering', !!interactive);
      cursorRingEl.classList.toggle('is-hovering', !!interactive);
    });
  }

  /* ============================================================
     HERO TITLE ANIMATION
  ============================================================ */
  function initHeroTitle() {
    const titleEl = document.getElementById('heroTitle');
    if (!titleEl) return;
    const word = 'TURKIANA';
    titleEl.setAttribute('aria-label', word);
    titleEl.innerHTML = word.split('').map((ch, i) =>
      `<span class="char" style="animation-delay:${0.5 + i * 0.08}s" aria-hidden="true">${ch}</span>`
    ).join('');
  }

  /* ============================================================
     NAV SCROLL EFFECT
  ============================================================ */
  function initNavScroll() {
    const navEl = document.getElementById('mainNav');
    if (!navEl) return;
    const onScroll = () => navEl.classList.toggle('is-scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     INTERSECTION OBSERVER — Reveals + Counter
  ============================================================ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
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
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${Math.min(i * 30, 300)}ms`);
      revealObs.observe(card);
    });
  }

  /* ============================================================
     CARD THUMB TILT
  ============================================================ */
  function initCardTilt() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    grid.addEventListener('mousemove', e => {
      const thumb = e.target.closest('.card-thumb');
      if (!thumb) return;
      const r = thumb.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  8;
      thumb.style.willChange = 'transform';
      thumb.style.transform  = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      thumb.style.transition = 'transform 0.08s ease';
    });
    grid.addEventListener('mouseleave', () => {
      grid.querySelectorAll('.card-thumb').forEach(t => {
        t.style.transform  = '';
        t.style.transition = '';
        t.style.willChange = '';
      });
    }, true);
    grid.addEventListener('mouseover', e => {
      const entering = e.target.closest('.card-thumb');
      const leaving  = e.relatedTarget?.closest('.card-thumb');
      if (leaving && leaving !== entering) {
        leaving.style.transform  = '';
        leaving.style.transition = '';
        leaving.style.willChange = '';
      }
    });
  }

  /* ============================================================
     IMAGE ERROR HANDLER + SHIMMER OBSERVER
  ============================================================ */
  function handleImage(img) {
    const thumb = img.closest('.card-thumb');
    if (img.complete) {
      if (img.naturalWidth) {
        img.classList.add('is-loaded');
      } else {
        if (thumb) thumb.classList.add('error');
      }
    }
    img.addEventListener('load', () => {
      img.classList.add('is-loaded');
    });
    img.addEventListener('error', () => {
      if (thumb) thumb.classList.add('error');
    });
  }

  function initImageShimmerObserver() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.querySelectorAll('img').forEach(handleImage);
    // Set up MutationObserver for dynamically added cards
    if (!grid._shimmerObserver) {
      grid._shimmerObserver = new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') handleImage(node);
            else node.querySelectorAll?.('img').forEach(handleImage);
          }
        }));
      });
      grid._shimmerObserver.observe(grid, { childList: true, subtree: true });
    }
  }

  function initImageErrorHandler() {
    // Already covered by handleImage, but keep for modal images
    const itemModalEl = document.getElementById('itemModal');
    if (itemModalEl) {
      itemModalEl.addEventListener('error', e => {
        const img = e.target;
        if (img.tagName === 'IMG' && img.closest('#itemImgWrapper')) {
          img.alt = 'Image unavailable';
          img.style.opacity = '0.3';
        }
      }, true);
    }
  }

  /* ============================================================
     MODAL — QR
  ============================================================ */
  let _qrOpener = null;
  function openQRModal(opener) {
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    _qrOpener = opener || null;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.focus();
  }
  function closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    modal.close();
    document.body.style.overflow = '';
    if (_qrOpener) { _qrOpener.focus(); _qrOpener = null; }
  }

  /* ============================================================
     MODAL — ITEM DETAIL
  ============================================================ */
  let _itemOpener = null;
  function openItemModal(itemId, openerEl) {
    const item = ITEM_MAP[itemId];
    if (!item) return;
    const modal = document.getElementById('itemModal');
    if (!modal) return;
    _itemOpener = openerEl || null;
    const isAr    = state.lang === 'ar';
    const name    = isAr ? item.ar : item.en;
    const desc    = isAr ? (item.descAr || item.descEn) : item.descEn;
    const imgSrc  = IMG_BASE + item.img;
    const imgWrapper = document.getElementById('itemImgWrapper');
    if (imgWrapper) {
      imgWrapper.innerHTML = `<img src="${imgSrc}" alt="${name}" style="max-width:100%; max-height:70vh; object-fit:contain;">`;
    }
    const titleEl = document.getElementById('itemModalTitle');
    const priceEl = document.getElementById('itemModalPrice');
    const descEl  = document.getElementById('itemModalDesc');
    const calEl   = document.getElementById('itemModalCal');
    const dietEl  = document.getElementById('itemModalDiet');
    if (titleEl) titleEl.textContent = name;
    if (priceEl) priceEl.textContent = `${item.price} ${CURRENCY}`;
    if (descEl)  descEl.textContent  = desc;
    if (calEl)   calEl.textContent   = item.cal;
    if (dietEl)  dietEl.innerHTML    = item.diet.map(d =>
      `<span class="diet-dot" data-diet="${d}" aria-label="${DIET_LABELS[d] || d}"></span>`
    ).join('');
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }
  function closeItemModal() {
    const modal = document.getElementById('itemModal');
    if (!modal) return;
    modal.close();
    document.body.style.overflow = '';
    if (_itemOpener) { _itemOpener.focus(); _itemOpener = null; }
  }

  /* ============================================================
     HERO IMAGE
  ============================================================ */
  function initHero() {
    const heroBgEl = document.getElementById('heroBg');
    if (!heroBgEl) return;
    const imgUrl = IMG_BASE + 'Carrotslice.jfif';
    const probe  = new Image();
    probe.onload  = () => {
      heroBgEl.style.backgroundImage = `url('${imgUrl}')`;
      heroBgEl.classList.add('loaded');
    };
    probe.onerror = () => heroBgEl.classList.add('loaded');
    probe.src = imgUrl;
  }

  /* ============================================================
     PWA / SERVICE WORKER
  ============================================================ */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg  => console.log('[Turkiana] SW registered:', reg.scope))
        .catch(err => console.warn('[Turkiana] SW registration failed:', err));
    }
  }

  /* ============================================================
     SYSTEM DARK-MODE SYNC (Issue #22)
  ============================================================ */
  function initSystemThemeSync() {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', e => {
      if (localStorage.getItem('tk-dark') !== null) return; // manual override
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
  }

  /* ============================================================
     SERVICE WORKER UPDATE TOAST
  ============================================================ */
  function showUpdateToast(worker) {
    if (document.getElementById('tk-update-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'tk-update-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span>A new version of Turkiana is ready.</span>
      <button id="tk-toast-refresh" aria-label="Refresh to update">Refresh</button>
      <button id="tk-toast-dismiss" aria-label="Dismiss update notification">✕</button>
    `;
    Object.assign(toast.style, {
      position: 'fixed', bottom: 'calc(max(4.5rem, env(safe-area-inset-bottom)) + 1rem)',
      left: '50%', transform: 'translateX(-50%)',
      background: 'var(--c-surface, #1C1109)', color: 'var(--c-text, #F0E6D0)',
      border: '1px solid var(--c-border-strong, rgba(196,150,62,0.28))',
      borderRadius: '999px', padding: '0.65rem 1.25rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      fontSize: '0.8rem', boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      zIndex: '9999', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
      animation: 'toastIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
    });
    if (!document.getElementById('tk-toast-style')) {
      const style = document.createElement('style');
      style.id = 'tk-toast-style';
      style.textContent = `@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } } #tk-update-toast button { background: var(--c-gold, #C4963E); color: #0C0805; border: none; border-radius: 999px; padding: 0.3rem 0.9rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; cursor: pointer; font-family: inherit; } #tk-toast-dismiss { background: transparent !important; color: var(--c-text-soft, #B8A888) !important; padding: 0.3rem 0.5rem !important; }`;
      document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    document.getElementById('tk-toast-refresh').addEventListener('click', () => {
      worker.postMessage('skipWaiting');
      window.location.reload();
    });
    document.getElementById('tk-toast-dismiss').addEventListener('click', () => toast.remove());
    setTimeout(() => toast.remove(), 18_000);
  }

  function initSWUpdateToast() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then(reg => {
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast(worker);
          }
        });
      });
    });
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg && reg.waiting) showUpdateToast(reg.waiting);
    });
  }

  /* ============================================================
     DEEP-LINK: ?item=<id>
  ============================================================ */
  function initDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');
    if (!itemId) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        const menuPage = document.getElementById('menuPage');
        const landing  = document.getElementById('landing');
        if (menuPage && menuPage.classList.contains('hidden')) {
          if (landing) landing.style.display = 'none';
          menuPage.classList.remove('hidden');
          document.body.classList.add('menu-page-active');
        }
        const card = document.querySelector(`.menu-card[data-id="${CSS.escape(itemId)}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => card.click(), 400);
        }
      }, 200);
    });
  }

  /* ============================================================
     SHARE API BUTTON
  ============================================================ */
  function injectShareButton() {
    if (!navigator.share) return;
    const itemModal = document.getElementById('itemModal');
    if (!itemModal) return;
    const detailsEl = itemModal.querySelector('.item-details');
    if (!detailsEl || detailsEl.querySelector('.tk-share-btn')) return;
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn btn-ghost tk-share-btn';
    shareBtn.style.cssText = 'align-self:flex-start; font-size:0.72rem; padding:0.6rem 1.5rem;';
    shareBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg> Share
    `;
    shareBtn.addEventListener('click', async () => {
      const title = document.getElementById('itemModalTitle')?.textContent;
      const price = document.getElementById('itemModalPrice')?.textContent;
      const desc  = document.getElementById('itemModalDesc')?.textContent;
      try {
        await navigator.share({ title: `${title} — Turkiana`, text: `${title} | ${price}\n${desc}`, url: window.location.href });
      } catch (err) { if (err.name !== 'AbortError') console.warn('[Turkiana] Share failed:', err); }
    });
    const closeBtn = itemModal.querySelector('#itemCloseModal');
    if (closeBtn) detailsEl.insertBefore(shareBtn, closeBtn);
    else detailsEl.appendChild(shareBtn);
  }

  function initShareButton() {
    const itemModal = document.getElementById('itemModal');
    if (!itemModal) return;
    if (itemModal.open) injectShareButton();
    const observer = new MutationObserver(() => {
      if (itemModal.open || itemModal.hasAttribute('open')) injectShareButton();
    });
    observer.observe(itemModal, { attributes: true, attributeFilter: ['open'] });
  }

  /* ============================================================
     EVENTS
  ============================================================ */
  function debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  function bindEvents() {
    const langToggleEl  = document.getElementById('langToggle');
    const themeToggleEl = document.getElementById('themeToggle');
    if (langToggleEl)  langToggleEl.addEventListener('click',  () => setState({ lang: state.lang === 'en' ? 'ar' : 'en' }));
    if (themeToggleEl) themeToggleEl.addEventListener('click', () => setState({ dark: !state.dark }));

    const scrollerEl = document.getElementById('categoryScroller');
    if (scrollerEl) {
      scrollerEl.addEventListener('click', e => {
        const pill = e.target.closest('.cat-pill');
        if (!pill) return;
        scrollerEl.querySelectorAll('.cat-pill').forEach(p => {
          p.classList.toggle('active', p === pill);
          p.setAttribute('aria-pressed', p === pill);
        });
        setState({ category: pill.dataset.cat });
      });
    }

    const searchInputEl = document.getElementById('searchInput');
    const searchClearEl = document.getElementById('searchClear');
    if (searchInputEl) {
      searchInputEl.addEventListener('input', debounce(e => setState({ search: e.target.value }), 220));
    }
    if (searchClearEl) {
      searchClearEl.addEventListener('click', () => {
        if (searchInputEl) { searchInputEl.value = ''; searchInputEl.focus(); }
        setState({ search: '' });
      });
    }

    const viewMenuBtnEl = document.getElementById('viewMenuBtn');
    const navBackBtnEl  = document.getElementById('navBackBtn');
    const mobileFabEl   = document.getElementById('mobileFab');
    if (viewMenuBtnEl) viewMenuBtnEl.addEventListener('click', showMenuPage);
    if (navBackBtnEl)  navBackBtnEl.addEventListener('click', showLandingPage);
    if (mobileFabEl) {
      mobileFabEl.addEventListener('click', () => {
        const menuPageEl = document.getElementById('menuPage');
        if (menuPageEl && !menuPageEl.classList.contains('hidden')) showLandingPage();
        else showMenuPage();
      });
    }
    const mobileFabWrapper = document.querySelector('.mobile-fab');
    if (mobileFabWrapper) mobileFabWrapper.removeAttribute('aria-hidden');

    const qrBtnEl    = document.getElementById('qrBtn');
    const herQrBtnEl = document.getElementById('herQrBtn');
    const closeMEl   = document.getElementById('closeModal');
    const qrModalEl  = document.getElementById('qrModal');
    if (qrBtnEl)    qrBtnEl.addEventListener('click',    () => openQRModal(qrBtnEl));
    if (herQrBtnEl) herQrBtnEl.addEventListener('click', () => openQRModal(herQrBtnEl));
    if (closeMEl)   closeMEl.addEventListener('click', closeQRModal);
    if (qrModalEl) {
      qrModalEl.addEventListener('click', e => { if (e.target === qrModalEl) closeQRModal(); });
      qrModalEl.addEventListener('close', () => {
        document.body.style.overflow = '';
        if (_qrOpener) { _qrOpener.focus(); _qrOpener = null; }
      });
    }

    const itemCloseEl  = document.getElementById('itemCloseModal');
    const itemModalEl  = document.getElementById('itemModal');
    if (itemCloseEl) itemCloseEl.addEventListener('click', closeItemModal);
    if (itemModalEl) {
      itemModalEl.addEventListener('click', e => { if (e.target === itemModalEl) closeItemModal(); });
      itemModalEl.addEventListener('close', () => {
        document.body.style.overflow = '';
        if (_itemOpener) { _itemOpener.focus(); _itemOpener = null; }
      });
    }

    const grid = document.getElementById('menuGrid');
    if (grid) {
      grid.addEventListener('click', e => {
        const card = e.target.closest('.menu-card');
        if (!card) return;
        openItemModal(card.dataset.id, card);
      });
      grid.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.menu-card');
        if (!card) return;
        e.preventDefault();
        openItemModal(card.dataset.id, card);
      });
    }
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    try {
      applyTheme();
      initHeroTitle();
      buildAllCards();          // now includes shimmer observer setup
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
      initSystemThemeSync();
      initSWUpdateToast();
      initDeepLink();
      initShareButton();
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
