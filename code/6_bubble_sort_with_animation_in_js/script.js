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
  var colWidth = 40;
  var minSpace = 10;
  var maxArrSize = parseInt((padWidth - padding * 2) / (minSpace + colWidth));
  var maxColHeight = screenHeight - padding * 2;
  var minColHeight = 20;
  var arrSize;
  var arr;
  var colPoses = [];

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
        var colGap = (padWidth - colWidth * arrSize) / (arrSize + 1);
        var colPos = colGap;
        // Generate the random numbers array and also the column positions array,
        // and show those numbers in the initial positions
        while (count--) {
          var num = parseInt(Math.random() * maxColHeight);
          if (num < minColHeight) {
            num += minColHeight;
          }
          if (num > maxColHeight) {
            num = maxColHeight;
          }
          arr.push(num);
          colPoses.push(colPos);
          createCol(num, colPos);
          colPos += colWidth + colGap;
        }
        console.log('Generated %O', arr);
      }
    }
  });

  /**
   * Create a col of value num in positon pos.
   */
  var createCol = function(num, pos) {
    var col = document.createElement('div');
    col.className = 'anim-col';
    col.style.width = colWidth + 'px';
    col.style.height = num + 'px';
    col.style.left = pos + 'px';
    var colNum = document.createElement('p');
    colNum.innerText = num;
    col.appendChild(colNum);
    pad.appendChild(col);
  };
})();
