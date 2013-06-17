/**
 * 文件名: assets/js/app/test-index.js
 * 版本: 1.0
 * 功能: 单元测试首页js
 *
 * 入口:
 * 返回:
 * 
 * 创建: donald 2013-01-24
 * 
 * 方法:
 */
;! function($) {
	var TestIndex = {
		init: function(config) {
			var self = this;
			self.config =  config;
			self.bindAction();
		},
		bindAction: function() {
			var self = this,
				config = self.config;
			config.btnTestOne.click(function() {
				var $this = $(this);
				var	trTestOne = $this.closest('tr'),
					spanTestResult = trTestOne.find('.test-one-result > span'),
					urlTest = trTestOne.find('a.test-url').attr('href');
				spanTestResult.html( 'testing' );
				$this.button('loading');
				$.ajax({
					url: urlTest,
					success: function(result) {
						var	passed = true;
						
						$this
							.siblings('.btn-detail')
								.data('result', result)
								.show();
						$.each(result, function(i, item) {
							if ('Failed'==item.Result) {
								passed = false;
							};
						});
						spanTestResult
							.html( passed ? 'Passed' : 'Failed' )
							.removeAttr('class')
							.addClass('label');
						var clsName = 'label-' + (passed ? 'success' : 'important');
						spanTestResult.addClass( clsName );
						$this.button('reset');
					},
					error: function() {
						$this.button('reset');
					}
				});
			});
			config.btnTestGroup.on('click', function() {
				var $this = $(this),
					aBtn = $this.closest('table').find('a.btn-test-one');
				aBtn.click();
			});
			config.btnTestAll.on('click', function() {
				console.log( this );
				console.log(self.config.btnTestGroup);
				self.config.btnTestGroup.click();
			});
			config.btnDetail.on('click', function() {
				var $this = $(this);
					result = $this.data('result');
				if (!result) {
					$this.hide();
					return;
				}
				config.modelResult.modal('show');
			});
		}
	}
	TestIndex.init({
		btnTestOne: $('.btn-test-one'),
		btnTestGroup: $('.test-group'),
		btnTestAll: $('#btn-test-all'),
		btnDetail: $('.btn-detail'),
		modelResult: $('.modal')
	});
} ( window.jQuery );