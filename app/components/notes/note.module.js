angular.module('note', []).controller('NoteCtrl', function($scope){
    	$scope.note = {
    		id: '',
    		tag: '',
    		link: '',
    		date: ''
    	};
    	$scope.notes = [];

    	$scope.saveNote = function() {
    		$scope.notes.push($scope.note);
    	}
    });