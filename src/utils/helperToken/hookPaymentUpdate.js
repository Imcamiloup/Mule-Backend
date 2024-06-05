const { user_reservations } = require('../db');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const handleStripeWebhook = async (req, res) => {
  
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the different types of webhook events
  switch (event.type) {
    case 'checkout.session.completed':
      
      return handleCompletedSession(event.data.object, res);
    default:
      
      return res.status(200).json({ received: true, message: 'Unhandled event type' });
  }
};

async function handleCompletedSession(session, res) {
  try {
    
    const reservation = await user_reservations.findOne({
      where: { stripe_session_id: session.id }
    });
    
    if (!reservation) {
      console.error('No reservation found for this session id');
      return res.status(404).json({ message: 'Reservation not found' });
    }

    
    const paymentStatus = session.payment_status || '';
    let newReservationStatus = 'pending';
    
    switch (paymentStatus) {
      case 'paid':
        newReservationStatus = 'pay';
        break;
      case 'pending':
        newReservationStatus = 'confirmed';
        break;
      case 'failed':
      case 'canceled':
        newReservationStatus = 'cancelled';
        break;
    }

    reservation.status = newReservationStatus;
    await reservation.save();
    `);

    return res.json({ message: 'Reservation updated successfully' });

  } catch (error) {
    console.error('Error handling completed session:', error);
    return res.status(500).json({ message: 'Error updating reservation status' });
  }
}

module.exports = { handleStripeWebhook };
