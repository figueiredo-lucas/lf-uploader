angular.module("lfUploader").directive("lfFileUpload", function () {
    return {
        restrict: 'E',
        replace: true,
        template: ['<div class="file-upload-container">',
            '   <div class="pic-upload" id="pup" ng-hide="!!thumb" ng-click="uploadPic()"></div>',
            '   <input accept="image/*" type="file" name="fup" id="fup" ng-hide="true"/>',
            '   <span ng-show="!!thumb">',
            '       <img class="uploaded-pic" id="pic" ng-src="{{thumb}}" alt="Foto carregada" />',
            '       <span id="close">&times;</span>',
            '   </span>',
            ' </div>'
        ].join(' '),
        scope: {
            model: '=?'
        },
        link: function (scope) {
            setTimeout(function () {
                var file = document.getElementById('fup');
                var close = document.getElementById('close');
                scope.uploadPic = function () {
                    file.click();
                };
                file.onchange = function () {
                    if (this.files && this.files[0]) {
                        scope.model = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            scope.thumb = e.target.result;
                            scope.$apply();
                        };
                        reader.readAsDataURL(this.files[0]);
                    }
                };
                close.onclick = function () {
                    scope.thumb = null;
                    scope.model = null;
                    file.value = '';
                    scope.$apply();
                };
            });
        }
    };
});