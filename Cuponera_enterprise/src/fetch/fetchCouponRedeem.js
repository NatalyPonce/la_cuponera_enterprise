const fetchCouponRedeem = ({couponCode, DUI})=>{
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM3Nzk5NjcsImV4cCI6MTc0MzgwMTU2N30.YBPSgZBYpskG36g2Fvo9gmBpeJuMhbaiamTRiF7sunA";
    fetch(`http://localhost:3000/api/v1/coupons/${couponCode}/redeem`, {
        method: 'POST',
        headers: {
          'Authorization':  `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ DUI })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al redimir el cupón:', error);
        });
}

export default fetchCouponRedeem;