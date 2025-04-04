const fetchCouponRedeem = async ({ couponCode, DUI }) => {
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MTA1MzYsImV4cCI6MTc0MzgzMjEzNn0.5PXpQdLuhB_JJ5_bwWHgU0rlVF4V00Y-_0Fh-LCnqo4";
  try {
    const response = await fetch(`https://apiv1.lacuponera.store/api/v1/coupons/${couponCode}/redeem`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ DUI }),
    });

    if (!response.ok) {
      throw new Error('Error en la redención del cupón');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;

  } catch (error) {
    console.error('Error al redimir el cupón:', error);
    throw error;
  }
};

export default fetchCouponRedeem;
