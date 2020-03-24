# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

mist = Shoe.create(
    name: 'Yeezy Mist', 
    description: "This 380 Mist Reflective features a reflective Mist Primeknit pattern on its upper and lacks the traditional lateral side stripe. An upgraded translucent Boost midsole and engineered gum outsole grip complete the design.", 
    image_url: 'https://i.shgcdn.com/42737ef2-2ec1-4e55-b011-3c6475038988/-/format/auto/-/preview/500x500/-/quality/lighter/',
    hype_count: 8
)

chuck = Shoe.create(
    name: 'Converse x Fear of God Chuck', 
    description: "With the elegant construction and natural tones Fear of God‘s footwear collaborations have become known for, the shoes combine a classic sport-focused look with a touch of high-street elegance.", 
    image_url: 'https://i.shgcdn.com/b8d508bf-8859-4d6f-9f53-acf58ba397c3/-/format/auto/-/preview/500x500/-/quality/lighter/',
    hype_count: 12
)

jordan = Shoe.create(
    name: 'Pine Green Air Jordan 1 Retro', 
    description: "The newest iteration of the AJ 1 Retro High OG basketball shoe features a rich color palette of Pine Green, black, white and Gym Red accents. The men's and grade school kids' basketball shoes follow the same color-blocking as the recent AJ 1 Retro 'Bred' release, swapping out Gym Red in favor of the Pine Green.", 
    image_url: 'https://i.shgcdn.com/20a916cb-9f4d-4083-8956-6b4063cdaa97/-/format/auto/-/preview/500x500/-/quality/lighter/',
    hype_count: 6
)

Comment.create(shoe: mist, name: 'BigOlBill', content: 'These shoes look like socks!')
Comment.create(shoe: mist, name: 'Peepers the Dog', content: "I'll take 4")
Comment.create(shoe: mist, name: 'SneakFan', content: 'I thought this was a hide and go seak site?')

Comment.create(shoe: chuck, name: 'HiTops', content: 'Super clean')
Comment.create(shoe: chuck, name: 'JimmyNoFeets', content: 'I wish I had feet so I could wear shoes')

Comment.create(shoe: jordan, name: 'Dad', content: 'I exclusivly wear $20 New Balances')

