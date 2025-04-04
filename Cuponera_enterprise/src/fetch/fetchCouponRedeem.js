const fetchCouponRedeem = async ({ couponCode, DUI }) => {
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MDcxMjgsImV4cCI6MTc0MzgyODcyOH0.-0w-JLtl_He2D5prCkL5G6WjZXCNccImSKPkHdMRVAE";
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
