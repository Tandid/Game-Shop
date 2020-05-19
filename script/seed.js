'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  OrderItems,
  Order,
  Review
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'dennis@gmail.com',
      password: '123',
      admin: true,
      firstName: 'Dennis'
    }),
    User.create({
      email: 'tandid@gmail.com',
      password: '123',
      admin: true,
      firstName: 'Tandid'
    })
  ])

  const [denis, tandid] = users

  const products = await Promise.all([
    Product.create({
      title: 'Super Smash Bros. Ultimate',
      description:
        'Super Smash Bros. Ultimate is a 2018 crossover fighting game developed by Bandai Namco Studios and Sora Ltd. and published by Nintendo for the Nintendo Switch. It is the fifth installment in the Super Smash Bros. series, succeeding Super Smash Bros. for Nintendo 3DS and Wii U.',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/81aJ-R4E6gL._SL1500_.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Animal Crossing New Horizons',
      description:
        'Animal Crossing: New Horizons is a 2020 life simulation video game developed and published by Nintendo for the Nintendo Switch. It is the fifth main series title in the Animal Crossing series. New Horizons was released in all regions on March 20, 2020.',
      imageURL:
        'https://media.gamestop.com/i/gamestop/10168434/Animal-Crossing-New-Horizons',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'The Legend of Zelda: Breath of the Wild',
      description:
        'The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles.',
      imageURL:
        'https://media.gamestop.com/i/gamestop/10141904/The-Legend-of-Zelda-Breath-of-the-Wild',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Pokemon Shield',
      description:
        'Pokémon Sword and Pokémon Shield are 2019 role-playing video games developed by Game Freak and published by The Pokémon Company and Nintendo for the Nintendo Switch.',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/71lz62-F84L._SY445_.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Gears 5',
      description:
        'Gears 5 is a third-person shooter video game developed by The Coalition and published by Xbox Game Studios for Microsoft Windows and Xbox One. It is the sixth installment of the Gears of War series and the sequel to Gears of War 4.',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/g/e/gears-5-cd-keys-xbox-discount.jpg',
      price: 39.99,
      inventory: 5,
      category: 'Xbox'
    }),
    Product.create({
      title: 'Halo 5: Guardians',
      description:
        'Gears 5 is a third-person shooter video game developed by The Coalition and published by Xbox Game Studios for Microsoft Windows and Xbox One. It is the sixth installment of the Gears of War series and the sequel to Gears of War 4. ',
      imageURL:
        'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9441/9441137_sa.jpg;maxHeight=640;maxWidth=550',
      price: 39.99,
      inventory: 5,
      category: 'Xbox'
    }),
    Product.create({
      title: 'Call of Duty: Modern Warfare',
      description:
        'Call of Duty: Modern Warfare is a 2019 first-person shooter video game developed by Infinity Ward and published by Activision.',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/c/o/cod-modern-warfare-xp-boost-dlc-ps4.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Playstation'
    }),
    Product.create({
      title: 'Final Fantasy VII',
      description:
        'Final Fantasy VII Remake is an action role-playing game developed and published by Square Enix, released for PlayStation 4 on April 10, 2020. It is the first in a planned series of games remaking the 1997 PlayStation game Final Fantasy VII.',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png',
      price: 59.99,
      inventory: 5,
      category: 'Playstation'
    }),
    Product.create({
      title: 'GTA V',
      description:
        'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the first main entry in the Grand Theft Auto series since 2008s Grand Theft Auto IV.',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/g/r/grand_theft_auto_v_5_gta_5_pc_3.jpg',
      price: 49.99,
      inventory: 5,
      category: 'PC'
    }),
    Product.create({
      title: "Marvel's Spider-Man",
      description:
        "Marvel's Spider-Man is a 2018 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment. Based on the Marvel Comics superhero Spider-Man, it is inspired by the long-running comic book mythology and adaptations in other media.",
      imageURL:
        'https://media.gamestop.com/i/gamestop/10131620/Marvels-Spider-Man',
      price: 39.99,
      inventory: 5,
      category: 'PS4'
    }),
    Product.create({
      title: 'NBA 2k20',
      description:
        'NBA 2K20 is a basketball simulation video game developed by Visual Concepts and published by 2K Sports, based on the National Basketball Association. It is the 21st installment in the NBA 2K franchise and the successor to NBA 2K19.',
      imageURL:
        'https://i5.walmartimages.com/asr/43b97328-e233-43ef-8bb2-8c552bf48de0_1.33f628552a54b5260095089309f87646.jpeg',
      price: 39.99,
      inventory: 5,
      category: 'Xbox'
    }),
    Product.create({
      title: 'Minecraft',
      description:
        'Minecraft is a sandbox video game developed by Mojang Studios. Minecraft was created by Markus "Notch" Persson in the Java programming language and was released as a public alpha for personal computers in 2009 before officially releasing in November 2011, with Jens Bergensten taking over development around then.',
      imageURL:
        'https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4?mode=scale&q=90&h=300&w=200',
      price: 19.99,
      inventory: 5,
      category: 'PC'
    }),
    Product.create({
      title: 'Mario Kart 8 Deluxe',
      description:
        'Mario Kart is a series of go-kart-style racing video games developed and published by Nintendo as spin-offs from its trademark Super Mario series. The first in the series, Super Mario Kart, was launched in 1992 on the Super Nintendo Entertainment System to critical and commercial success.',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/91BphPXVYVL._AC_SY550_.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Red Dead Redemption 2',
      description:
        'Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games. The game is the third entry in the Red Dead series and is a prequel to the 2010 game Red Dead Redemption.',
      imageURL:
        'https://media.rockstargames.com/rockstargames-newsite/uploads/d5c7e4dcecb612368aee64978f183250b6e643fe.jpg',
      price: 59.99,
      inventory: 5,
      category: 'PC'
    }),
    Product.create({
      title: 'Fallout-76',
      description:
        'Fallout 76 is an online action role-playing game developed by Bethesda Game Studios and published by Bethesda Softworks. Released for Microsoft Windows, PlayStation 4, and Xbox One on November 14, 2018, it is an installment in the Fallout series and a prequel to previous entries.',
      imageURL: 'https://media.gamestop.com/i/gamestop/10163237/Fallout-76',
      price: 39.99,
      inventory: 5,
      category: 'Xbox'
    })
  ])

  const [
    SSBU,
    AC,
    LOZ,
    PS,
    G5,
    HALO,
    COD,
    FF7,
    GTAV,
    SMAN,
    NBA,
    MC,
    MK8,
    RDR2,
    F76
  ] = products

  const orders = await Promise.all([
    Order.create({
      userId: denis.id,
      status: 'cart',
      totalPrice: parseFloat(SSBU.price) + parseFloat(AC.price)
    }),
    Order.create({
      userId: tandid.id,
      status: 'cart',
      totalPrice: parseFloat(SSBU.price) + parseFloat(GTAV.price)
    }),
    Order.create({
      userId: denis.id,
      status: 'completed',
      totalPrice: parseFloat(FF7.price) + parseFloat(HALO.price)
    })
  ])

  const [activeOrder1, activeOrder2, completedOrder] = orders

  const cart1 = await Promise.all([
    OrderItems.create({productId: SSBU.id, orderId: activeOrder1.id}),
    OrderItems.create({productId: AC.id, orderId: activeOrder1.id})
  ])

  const cart2 = await Promise.all([
    OrderItems.create({productId: SSBU.id, orderId: activeOrder2.id}),
    OrderItems.create({productId: GTAV.id, orderId: activeOrder2.id})
  ])

  const compOrd = await Promise.all([
    OrderItems.create({productId: FF7.id, orderId: completedOrder.id}),
    OrderItems.create({productId: HALO.id, orderId: completedOrder.id})
  ])

  const reviews = await Promise.all([
    Review.create({
      text: 'perfect game',
      stars: 9,
      userId: denis.id,
      productId: 1
    }),
    Review.create({
      text: 'perfect game',
      stars: 8,
      userId: denis.id,
      productId: 2
    }),
    Review.create({
      text: 'perfect game',
      stars: 8,
      userId: denis.id,
      productId: 2
    }),
    Review.create({
      text: 'perfect game',
      stars: 7,
      userId: denis.id,
      productId: 5
    }),
    Review.create({
      text: 'perfect game',
      stars: 8,
      userId: denis.id,
      productId: 5
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
