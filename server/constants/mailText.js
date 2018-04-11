const sendAddedOrderMail =(id) =>  "<b>Hello!</b> <p> Thank you for your order! Your order was sent and processing now.</p>"+
                                    "<p> Your track code is: "+id+" </p>"+
                                    "<p> You can track it by link: <a href=\"https://delivery-service08.herokuapp.com/track\""+id+">TRACK NOW!</a></p>"

const sendArrivedOrderMail =(id) =>  "<b>Hello!</b> <p> Your order has arrived to your delivery address.</p>"+
                                "<p> Now you can get it with your code: "+id+" </p>"


module.exports = {sendAddedOrderMail, sendArrivedOrderMail}   