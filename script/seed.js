'use strict'

const db = require('../server/db')
const {User, Product, OrderItems, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'paul@gmail.com', password: '123'}),
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

  const products = await Promise.all([
    Product.create({
      title: 'Super Smash Bros. Ultimate',
      description: 'Switch',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/81aJ-R4E6gL._SL1500_.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Animal Crossing New Horizons',
      description: 'Switch',
      imageURL:
        'https://media.gamestop.com/i/gamestop/10168434/Animal-Crossing-New-Horizons',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'The Legend of Zelda: Breath of the Wild',
      description: 'Switch',
      imageURL:
        'https://media.gamestop.com/i/gamestop/10141904/The-Legend-of-Zelda-Breath-of-the-Wild',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Pokemon Shield',
      description: 'Switch',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/71lz62-F84L._SY445_.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Nintendo'
    }),
    Product.create({
      title: 'Gears 5',
      description: 'Xbox One',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/g/e/gears-5-cd-keys-xbox-discount.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Xbox'
    }),
    Product.create({
      title: 'Halo 5: Guardians',
      description: 'Xbox One',
      imageURL:
        'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9441/9441137_sa.jpg;maxHeight=640;maxWidth=550',
      price: 59.99,
      inventory: 5,
      category: 'Xbox'
    }),
    Product.create({
      title: 'Call of Duty: Modern Warfare',
      description: 'PS4',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/c/o/cod-modern-warfare-xp-boost-dlc-ps4.jpg',
      price: 59.99,
      inventory: 5,
      category: 'Playstation'
    }),
    Product.create({
      title: 'Final Fantasy VII',
      description: 'PS4',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png',
      price: 59.99,
      inventory: 5,
      category: 'Playstation'
    }),
    Product.create({
      title: 'GTA V',
      description: 'PC',
      imageURL:
        'https://cdn.cdkeys.com/500x706/media/catalog/product/g/r/grand_theft_auto_v_5_gta_5_pc_3.jpg',
      price: 59.99,
      inventory: 5,
      category: 'PC'
    })
  ])

  const [SSBU, AC, LOZ, PS, G5, HALO, COD, FF7, GTAV] = products

  const orders = await Promise.all([
    Order.create({userId: 2, status: 'cart'}),
    Order.create({userId: 3, status: 'cart'})
    // Order.create({userId: 2, status: 'completed'}),
  ])

  const [activeOrder1, activeOrder2, completedOrder] = orders

  // const cart1 = await Promise.all([
  //   OrderItems.create({productId: SSBU.id, orderId: activeOrder1.id}),
  //   OrderItems.create({productId: AC.id, orderId: activeOrder1.id})
  // ])

  // const cart2 = await Promise.all([
  //   OrderItems.create({productId: SSBU.id, orderId: activeOrder2.id}),
  //   OrderItems.create({productId: GTAV.id, orderId: activeOrder2.id})
  // ])

  // const compOrd = await Promise.all([
  //   OrderItems.create({productId: FF7.id, orderId: completedOrder.id}),
  //   OrderItems.create({productId: HALO.id, orderId: completedOrder.id})
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
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
