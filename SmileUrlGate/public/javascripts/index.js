window.onload = () => {
    
    init();

    function init() {
        const txtLongUrl = document.getElementById('longUrl');
        const btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.addEventListener('click', () => {
            let longUrl = txtLongUrl.value

            if (longUrl.indexOf('http://') != -1) {
                parseData = txtLongUrl.value.replace('http://', '');
                longUrl = parseData;
            }
            if (longUrl.indexOf('https://') != -1) {
                parseData = txtLongUrl.value.replace('https://', '');
                longUrl = parseData;
            }

            fetchIsInLongUrl(longUrl)
                .then(data => {
                    if (data) {// 데이터가 중복된 경우
                        processedUrl = 'http://localhost:3000/' + data.shortUrl;
                        addShortUrlInDiv(processedUrl);
                    } else { //아닌 경우
                        fetchCreateShortUrl(longUrl)
                            .then((data) => {
                                processedUrl = 'http://localhost:3000/' + data.shortUrl;
                                addShortUrlInDiv(processedUrl);
                            });
                    }
                });
        });
    }

    function fetchIsInLongUrl(url) {
        return new Promise((resolve, reject) => {
            const host = 'http://localhost:3000/mongo/isInUrl'
            fetch(host, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'longUrl': url
                })
            }).then(result => {
                result.json()
                    .then(data => {
                        resolve(data);
                    })
            })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    function fetchCreateShortUrl(url) {
        return new Promise((resolve, reject) => {
            const host = 'http://localhost:3000/mongo/createShortUrl'
            fetch(host, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'longUrl': url
                })
            }).then(result => {
                result.json()
                    .then(data => {
                        resolve(data);
                    })
            })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    function addShortUrlInDiv(shortUrl) {
        const txtShortUrl = document.getElementById('shortUrl');
        txtShortUrl.innerHTML = '<a href="' + shortUrl + '">' + shortUrl + '</a>';
    }


}