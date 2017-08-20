;(function() {
  var screenWidth = document.body.clientWidth;
  var screenHeight = document.body.clientHeight;
  var pad = document.getElementById('animation-pad');
  var maxSizeContainer = document.getElementById('max-size-container');
  var arrSizeInput = document.getElementById('array-size');
  var btnGenArr = document.getElementById('generate-array');
  var btnPlay = document.getElementById('btn-play');
  var btnPause = document.getElementById('ben-pause');
  var btnRound = document.getElementById('btn-next-round');
  var btnStep = document.getElementById('btn-next-step');
  var rdoAsc = document.getElementById('rdo-asc');

  var padWidth = screenWidth * .7;
  var padHeigth = screenHeight;
  var padding = 20;
  var colWidth = 40;
  var minSpace = 10;
  var maxArrSize = parseInt((padWidth - padding * 2) / (minSpace + colWidth));
  var maxColHeight = screenHeight - padding * 2;
  var minColHeight = 20;
  var isAsc;
  var arrSize;
  var arr;
  var colPoses;
  var colElems;

  // Variables to control the animation progress
  var MODE = {
    ALL: 0,
    ROUND: 1,
    STEP: 2
  };
  var mode = MODE.ALL;
  var shouldPause;
  var isRunning;
  var isFinished;
  var totalStep;
  var totalStepThd;
  var round;
  var roundThd;
  var step;
  var stepThd;

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

    totalStepThd = arrSize * (arrSize - 1) / 2;
    totalStep = 0;
    step = 0;
    round = 0;
    roundThd = arrSize - 1;
    stepThd = rounds;
    shouldPause = false;
    isRunning = false;
    isFinished = false;

    if (arrSize || arrSize === 0) {
      arrSizeInput.value = arrSize;
      if (arrSize >= 3 && arrSize <= maxArrSize) {
        arr = [];
        colPoses = [];
        colElems = [];
        isAsc = !rdoAsc || rdoAsc.checked;
        console.log(isAsc);
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

  btnPlay.addEventListener('click', function() {
    if (!isFinished && !shouldPause && !isRuning) {
      isRunning = true;
      btnPause.disabled = false;
      btnPlay.disabled = true;
      btnRound.disabled = true;
      btnStep.disabled = true;
      runNextStep();
    }
  });

  btnPause.addEventListener('click', function() {
    if (!isFinished && isRunning) {
      shouldPause = true;
      btnPause.disabled = true;
      btnPlay.disabled = true;
      btnRound.disabled = true;
      btnStep.disabled = true;
    }
  });

  btnRound.addEventListener('click', function() {
    
  });

  btnStep.addEventListener('click', function() {
    
  });

  var runNextStep = function() {
    if (isFinished || totalStep >= total) {
      isFinished = true;
    } else if (step >= stepThd) {
      runNextRound();
    } else if (shoudPause) {
      
    } else {
    }
  };
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
    colElems.push(col);
  };
})();
