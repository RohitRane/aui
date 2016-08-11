export class SmoothScroll {

  constructor($timeout, $log, $window, $document) {

    'ngInject';

    let vm = this; vm.DI = () => ({ $timeout, $log, $window, $document });
  }

  scrollTo(eID) {
    let vm = this,
      {$timeout, $log, $window, $document} = vm.DI();
    $timeout(function () {
      // This scrolling function 
      // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

      var startY = currentYPosition(eID);
      var stopY = elmYPosition(eID) - 80;
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      var speed, step;
      if (distance < 100) {
        //scrollTo(0, stopY); return;
        speed = 2;
        step = 20;
      } else {
        speed = Math.round(distance / 50);
        if (speed >= 20) speed = 20;
        step = Math.round(distance / 50);
      }
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        var leapYArr = [];
        for (var i = startY; i < stopY; i += step) {
          leapYArr[timer] = angular.copy(leapY);
          $timeout(function () {
            $window.scrollTo(0, leapYArr.shift());
          }, timer * speed);
          leapY += step;
          if (leapY > stopY) leapY = stopY;
          timer++;

        }
        return;
      } {
        leapYArr = [];
        for (var j = startY; j > stopY; j -= step) {
          leapYArr[timer] = angular.copy(leapY);
          $timeout(function () {
            $window.scrollTo(0, leapYArr.shift());
          }, timer * speed);
          leapY -= step;
          if (leapY < stopY) leapY = stopY;
          timer++;
        }
      }
    });

    function currentYPosition(eID) {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) {
        //workaround to make the smooth scroll work in the home page.
        if (eID === 'main-know-nobly') {
          return 0;
        }
        return self.pageYOffset;
      }
      // Internet Explorer 6 - standards mode
      if ($document[0].documentElement && $document[0].documentElement.scrollTop)
        return $document[0].documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if ($document[0].body.scrollTop) return $document[0].body.scrollTop;
      return 0;
    }

    function elmYPosition(eID) {
      var elm = $document[0].getElementById(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != $document[0].body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }
      return y;
    }

  };
}

////////////////////////////////////////////////////////////////////