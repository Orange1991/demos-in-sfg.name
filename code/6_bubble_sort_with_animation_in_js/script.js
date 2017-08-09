;(function() {
  var screenWidth = document.body.clientWidth;
  var screenHeight = document.body.clientHeight;
  var pad = document.getElementById('animation-pad');
  var maxSizeContainer = document.getElementById('max-size-container');
  var arrSizeInput = document.getElementById('array-size');
  var btnGenArr = document.getElementById('generate-array');

  var padWidth = screenWidth * .7;
  var padHeigth = screenHeight;
  var padding = 20;
  var columnWidth = 20;
  var minSpace = 10;
  var maxArrSize = parseInt((padWidth - padding * 2) / (minSpace + columnWidth));
  var arrSize;
  var arr;

  pad.style.height = screenHeight + 'px';
  pad.style.width = screenWidth * .7 + 'px';
  maxSizeContainer.innerText = maxArrSize;

  btnGenArr.addEventListener('click', function() {
    arrSize = null;
    try {
      arrSize = parseInt(arrSizeInput.value);
    } catch (e) {
      alert('You input an invalid number');
    }
    if (arrSize || arrSize === 0) {
      arrSizeInput.value = arrSize;
      if (arrSize >= 3 && arrSize <= maxArrSize) {
        arr = [];
        var count = arrSize;
        while (count--) {
          arr.push(parseInt(Math.random() * maxArrSize) + 3);
        }
        console.log('Generated %O', arr);
      }
    }
  });
})();
