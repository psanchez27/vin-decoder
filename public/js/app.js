const vin = document.getElementById('vin');
const year = document.getElementById('year');
const make = document.getElementById('make');
const model = document.getElementById('model');
const trim = document.getElementById('trim');
const engine = document.getElementById('engine');
const btn = document.getElementById('get-vin');

btn.addEventListener('click', () => {
    if(vin.value.trim() === '' || vin.value.length !== 17){
        vin.classList.add('error');
        shake();
    }else{
        //check the vin
        fetch(
            `https://api.carmd.com/v3.0/decode?vin=${vin.value}`,
            {
              headers: {
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "accept-language": "en-US,en;q=0.8",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
                authorization: "Basic NjMwMWU5MWUtMmFiMS00MGM3LThjYWYtMzhmZGIwNWMxNzIy",
                "partner-token": "b81c4c0721e54804b9127a259165cc46"
              }
            }
          )
          .then(res => res.json())
          .then(res => {
            // console.log(res.data)
              vin.classList.remove('error');
              year.textContent = res.data.year;
              make.textContent = res.data.make;
              model.textContent = res.data.model;
              trim.textContent = res.data.trim;
              engine.textContent = res.data.engine;
          })
          .catch(err => {
              vin.classList.add('error');
              shake();
              year.textContent = 'Invalid VIN';
              make.textContent = '';
              model.textContent = '';
              trim.textContent = '';
              engine.textContent = '';
          })
    }
})

const shake = () => {
    vin.classList.add('shake');
    setTimeout(function() {
        vin.classList.remove('shake');
    }, 300);
}