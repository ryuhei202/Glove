3.times do |n|
  user = User.create!(
    name:"example_user_#{n}",
    email:"eampleuser#{n+1}@gmail.com",
    password:"foobar",
    password_confirmation:"foobar",
    gender:1
  )
end
