;(function() {
  var screenWidth = document.body.clientWidth;
  var screenHeight = document.body.clientHeight;
  var pad = document.getElementById('animation-pad');
  var maxSizeContainer = document.getElementById('max-size-container');
  var arrSizeInput = document.getElementById('array-size');
  var btnGenArr = document.getElementById('generate-array');
  var btnPlay = document.getElementById('btn-play');
  var btnPause = document.getElementById('btn-pause');
  var btnRound = document.getElementById('btn-next-round');
  var btnStep = document.getElementById('btn-next-step');
  var rdoAsc = document.getElementById('rdo-asc');
  var recordTitle = document.getElementById('sort-records-title');
  var records = document.getElementById('records');
  var actionBar = document.getElementById('action-bar');

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
  var isInited = false;
  var isRunning;
  var isFinished;
  var totalStep;
  var totalStepThd;
  var round;
  var roundThd;
  var step;
  var stepThd;
  var nextTimer;
  var ANIM_SORT_DURATION = 1500;
  var ANIM_TWINKLE_DURATION = 1000;
  var cmpClass = 'comparing';

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
    stepThd = arrSize - round - 1;
    shouldPause = false;
    isRunning = false;
    isFinished = false;
    isAsc = !rdoAsc || rdoAsc.checked;
    pad.innerHTML = '';
    recordTitle.innerText = isAsc ? 'Ascending' : 'Descending';
    records.innerHTML = '';
    nextTimer = null;
    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnRound.disabled = false;
    btnStep.disabled = false;

    if (arrSize || arrSize === 0) {
      arrSizeInput.value = arrSize;
      if (arrSize >= 3 && arrSize <= maxArrSize) {
        arr = [];
        colPoses = [];
        colElems = [];
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
        isInited = true;
        var p = document.createElement('p');
        p.innerText = 'Original array = [' + arr.join(', ') + '].';
        records.appendChild(p);
      }
    }
  });

  btnPlay.addEventListener('click', function() {
    if (isInited && !isFinished && !shouldPause && !isRunning) {
      isRunning = true;
      btnPause.disabled = false;
      btnPlay.disabled = true;
      btnRound.disabled = true;
      btnStep.disabled = true;
      runRound();
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
    mode = MODE.ROUND;
    runRound();
  });

  btnStep.addEventListener('click', function() {
    
  });

  var runStep = function() {
    if (!isInited) {
      return;
    }
    if (isFinished || totalStep >= totalStepThd) {
      isFinished = true;
    } else if (step >= stepThd) {
      runRound();
    } else if (shouldPause) {
      nextTimer && clearTimeout(nextTimer);
      isRunning = false;
      btnPause.disabled = true;
      btnPlay.disabled = false;
      btnRound.disabled = false;
      btnStep.disabled = false;
    } else {
      var index = step++;
      sort(index, index + 1, isAsc);
      nextTimer = setTimeout(function() {
        if (mode === MODE.STEP) {
          btnPlay.disabled = false;
          btnPause.disabled = true;
          btnRound.disabled = false;
          btnStep.disabled = false;
        } else {
          runStep();
        }
      }, ANIM_SORT_DURATION);
    }
  };

  var runNextRound = function() {
    if (mode === MODE.ALL) {
      if (round < roundThd) {
        ++round;
        step = 0;
        stepThd = arrSize - round - 1;
      } else {
        isFinished = true;
      }
      runStep();
    }
  };

  var runRound = function() {
    if (step >= stepThd) {
      ++round;
      if (round >= roundThd) {
        addRecord('Finished');
        isFinished = true;
      } else {
        step = 0;
        stepThd = arrSize - round - 1;
        addRecord('Round ' + round);
        runStep();
      }
    } else {
      if (step === 0) {
        addRecord('Round ' + round);
      }
      runStep();
    }
  };

  var addRecord = function(text) {
    var p = document.createElement('p');
    p.innerText = text;
    records.appendChild(p);
    records.scrollTop = actionBar.scrollHeight;
  };

  var sort = function(index1, index2, isAsc) {
    var num1 = arr[index1];
    var num2 = arr[index2];
    var col1 = colElems[index1];
    var col2 = colElems[index2];
    col1.classList.add(cmpClass);
    col2.classList.add(cmpClass);
    var cmpTimer = setTimeout(function() {
      col1.classList.remove(cmpClass);
      col2.classList.remove(cmpClass);
      if (num1 === num2) {
        addRecord('array[' + index1 + ']:' + num1 + '=' + 'array[' + index2 + ']:' + num2 + ', no need to revert');
      } else if (isAsc && num1 > num2) {
        addRecord('array[' + index1 + ']:' + num1 + '>' + 'array[' + index2 + ']:' + num2 + ', no revert');
        revertPos(index1, index2);
      } else if (!isAsc && num1 < num2) {
        addRecord('array[' + index1 + ']:' + num1 + '<' + 'array[' + index2 + ']:' + num2 + ', revert');
        revertPos(index1, index2);
      } else {
        addRecord('array[' + index1 + ']:' + num1 + '<' + 'array[' + index2 + ']:' + num2);
      }
      cmpTimer = null;
    }, ANIM_TWINKLE_DURATION);
  };

  var revertPos = function(index1, index2) {
    var num1 = arr[index1];
    var num2 = arr[index2];
    var col1 = colElems[index1];
    var col2 = colElems[index2];
    arr[index1] = num2;
    arr[index2] = num1;
    col1.style.left = colPoses[index2] + 'px';
    col2.style.left = colPoses[index1] + 'px';
    colElems[index1] = col2;
    colElems[index2] = col1;
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
