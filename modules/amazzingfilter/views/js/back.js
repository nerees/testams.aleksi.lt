/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

var ajax_action_path = window.location.href.split('#')[0]+'&ajax=1',
	af = {};

$(document).ready(function() {

	$.extend(af, {
		init: function() {
			af.bindGeneralEvents();
			af.popup.init();
			af.activateMultilangSelectors();
			af.oos.bindEvents();
			af.relatedOptions.init(); // should be called before activating instantSettings
			af.customSorting.init();
			af.instantSettings.init();
		},
		bindGeneralEvents: function() {
			$(document).on('change', '.switch-select', function() {
				$(this).toggleClass('yes', $(this).val() == 1);
			});
			$('#general-settings').find('.tab-title.intermediate').on('click', function() {
				$(this).toggleClass('minimized')
				.nextUntil('.tab-title.intermediate').filter('.settings-item').toggleClass('minimized');
			}).slice(2).click(); // minimize all after 2nd .tab-title.intermediate
		},
		popup: {
			init: function() {
				af.popup.$container = $('#dynamic-popup');
				af.popup.$container.on('click', '.close[data-dismiss="modal"]', function() {
					setTimeout(function() {
						af.popup.$container.find('.dynamic-content, .modal-title').html('');
					}, 500);
				});
			},
			toggle: function() {
				af.popup.$container.modal('toggle');
			},
			showContent: function(title, content) {
				af.popup.$container.find('.modal-title').html(title);
				af.popup.$container.find('.dynamic-content').html(content);
				af.popup.toggle();
				setTimeout(function() {
					af.mce.activateVisible(af.popup.$container);
				}, 500);
			},
		},
		mce: {
			activateVisible: function($container) {
				if (typeof tinySetup != 'function') {
					return;
				}
				if (window.location.href.indexOf('#') >= 0) {
					// if there is # in URL, page scrolls to top after activating MCE
					window.history.pushState(null, null, window.location.href.split('#')[0]);
				}
				$container.find('textarea.mce:visible').not('.mce-activated').each(function() {
					var $el = $(this);
					if (!$el.attr('id')) {
						$el.attr('id', 'id-'+(new Date().getTime()));
					}
					tinySetup({
						selector: '#'+$el.attr('id'),
						setup: function(editor) {
							editor.on('LoadContent', function(e) {
								$el.addClass('mce-activated');
								$(document).off('focusin'); // fix editing source code in modal popup
							});
						},
					});
				});
			},
			updateTextareaValues: function($form) {
				$form.find('textarea.mce-activated').each(function() {
					$(this).val(tinyMCE.get($(this).attr('id')).getContent());
				});
			},
		},
		merged: {
			types: ['attribute', 'feature'],
			toggleMenuItems: function() {
				$.each(af.merged.types, function(i, type) {
					let $tab = $('.list-group-item[href="#merged-'+type+'s"]');
					if ($('.settings_form[data-type="general"]').find('[name="merged_'+type+'s"]').val() > 0) {
						if ($tab.hasClass('hidden')) {
							if (af.$lastChangedOption &&
								af.$lastChangedOption.attr('name').startsWith('merged_')) {
								$('html, body').animate({scrollTop: $tab.offset().top - 250}, 20);
							}
							$tab.removeClass('hidden').addClass('active flashing');
							setTimeout(function() {
								$tab.removeClass('active flashing');
							}, 500);
						}
					} else if (!$tab.hasClass('hidden')) {
						$tab.addClass('hidden').removeClass('active flashing');
					}
				});
			},
			getNewPosition: function($parent) {
				var position = 0;
				$parent.find('.item-position').each(function() {
					var val = parseInt($(this).val());
					position = val > position ? val : position;
				});
				return position + 1;
			},
		},
		prependErrors: function ($parent, errorsHTML) {
			$parent.prepend(errorsHTML);
			$('html, body').animate({scrollTop: $parent.offset().top - 150}, 300);
		},
		activateMultilangSelectors: function() {
			$(document).on('click', '.selectLanguage', function() {
				var $form = $(this).closest('form'),
					id_lang = $(this).data('lang');
				$form.find('.multilang').addClass('hidden').filter('.lang-'+id_lang).removeClass('hidden');
				af.mce.activateVisible($form);
			});
		},
		relatedOptions: {
			init: function() {
				$('.has-related-options').not('.ready').each(function() {
					var $related = $(this).closest('form').find($(this).data('related'));
					if ($related.length) {
						$(this).find('input[type="text"]').on('keyup', function() {
							af.relatedOptions.toggle($related, parseInt($(this).val()));
						}).keyup();
						$(this).find('input:not([type="text"]), select').on('change', function() {
							af.relatedOptions.toggle($related, $(this).val());
						}).filter('input:checked, select').change();
					}
				}).addClass('ready');
			},
			toggle: function($els, value) {
				$els.filter('[class*=" hidden-on-"]').removeClass('hidden').filter('.hidden-on-'+value).addClass('hidden');
				$els.filter('[class*=" visible-on-"]').addClass('hidden').filter('.visible-on-'+value).removeClass('hidden');
			}
		},
		instantSettings: {
			active: false,
			$checkbox: $('.instant-settings'),
			init: function() {
				this.$checkbox.on('change', function() {
					af.instantSettings.active = $(this).prop('checked') ? 1 : 0;
					$('.panel-footer.multiple-settings').toggleClass('hidden', af.instantSettings.active);
					af.storage.save('instantSettings', af.instantSettings.active);
				});
				if (af.storage.get('instantSettings') > 0) {
					this.$checkbox.prop('checked', true).change();
				}
				$('.settings_form').on('change', 'input, select', function() {
					af.$lastChangedOption = $(this);
					af.instantSettings.autosaveIfRequired($(this));
				});
				this.toggle();
			},
			toggle: function() {
				var show = !!$('.tab-pane.active').find('.panel-footer.multiple-settings').length;
				$('.instant-settings-label').toggleClass('hidden', !show);
			},
			autosaveIfRequired($el) {
				if ($el.hasClass('no-autosaving-once')) {
					$el.removeClass('no-autosaving-once');
				} else if (af.instantSettings.active) {
					$el.closest('.tab-pane').find('.saveMultipleSettings').click();
				}
			}
		},
		customSorting: {
			init: function() {
				$('.advanced-sorting-config').not('.ready').each(function() {
					let $parent = $(this);
					$parent.find('.selected-sorting-option').on('click', function() {
						if (!$parent.hasClass('show-options')) {
							$parent.addClass('show-options');
							af.onClickOutSide($parent.find('.dynamic-sorting-options'), function() {
								$parent.removeClass('show-options');
								if ($parent.hasClass('saving-required')) {
									af.instantSettings.autosaveIfRequired($parent.removeClass('saving-required'));
								}
							});
							if (!$parent.hasClass('events-ready')) {
								af.customSorting.bindEventsForOptions($parent);
							}
						}
					});
					af.customSorting.toggleRandomSettings($parent.closest('form'));
				}).addClass('ready');
				$('.simple-sorting-config').not('.ready').each(function() {
					$(this).find('.af-default-sorting-input').on('change', function() {
						af.customSorting.toggleRandomSettings($(this).closest('form'), $(this).val() == 'random.desc');
					}).change();
				}).addClass('ready');
			},
			bindEventsForOptions: function($parent) {
				let $options = $parent.find('.option');
				$options.on('click', function(e) {
					if ($(this).hasClass('no-click-actions')) {
						return;
					}
					if ($(this).hasClass('active')) {
						let statusClicked = $(e.target).hasClass('status');
						if ($(this).hasClass('current') && (!statusClicked || !$(this).siblings('.active').length)) {
							return;
						}
						if (statusClicked) {
							$(this).removeClass('active current').find('.status-checkbox').prop('checked', false);
							af.customSorting.moveElement($(this));
						} else {
							$(this).addClass('current').siblings().removeClass('current');
						}
						af.customSorting.updateDefaultOptionInput($parent);
					} else {
						$(this).addClass('active').find('.status-checkbox').prop('checked', true);
						af.customSorting.moveElement($(this));
					}
					$parent.addClass('saving-required');
				});
				$parent.addClass('events-ready')
				.find('.dynamic-sorting-options').append($options.not('.active'))
				.sortable({
					items: '.active',
					cancel: '.not-sortable',
					// handle: '.dragger',
					update: function() {
						$parent.addClass('saving-required');
					},
				});
			},
			updateDefaultOptionInput: function($parent) {
				let $defaultOption = $parent.find('.current');
				if (!$defaultOption.length) {
					$defaultOption = $parent.find('.active').first().addClass('current');
					if (!$defaultOption.length) {
						$defaultOption = $parent.find('.option').first().addClass('active current');
					}
				}
				$parent.find('.selected-sorting-option').html($defaultOption.text());
				$parent.closest('form').find('.af-default-sorting-input').val($defaultOption.data('value'));
			},
			moveElement: function($el) {
				let isActive = $el.hasClass('active'),
					distanceToMove = isActive ? $el.prevUntil('.active').length : $el.nextAll('.active').length;
				$el.toggleClass('not-sortable', !isActive);
				if (distanceToMove) {
					$el.addClass('no-click-actions');
					setTimeout(function() {
						let $activeSiblings = $el.siblings('.active'),
							$placeHolder = $el.clone().css({opacity: 0}).insertAfter($activeSiblings.last()),
							animationTime = Math.max(distanceToMove * 30, 150),
							h = $el.outerHeight();
						$el.attr('style', 'position:absolute;z-index:999;width:'+$el.outerWidth()+'px').animate({
							'top': (h * $activeSiblings.length + h / 2)+'px'
						}, animationTime, 'linear', function() {
							$el.insertBefore($placeHolder).attr('style', '').removeClass('no-click-actions');
							$placeHolder.remove();
							if ($el.data('value') == 'random.desc') {
								af.customSorting.toggleRandomSettings($el.closest('form'), isActive);
							}
						});
					}, 200);
				}
			},
			toggleRandomSettings: function($form, show) {
				if (typeof show == 'undefined') {
					show = $form.find('.af-default-sorting-input').val() == 'random.desc' ||
					!!$form.find('.advanced-sorting-config').find('.option.active[data-value="random.desc"]').length;
				}
				$form.find('.random-upd').toggleClass('hidden', !show);
			}
		},
		oos: {
			$secondaryOptions: $('.oos-option.secondary').find('option'),
			allowed: {0: [0,1,2,3,4], 1: [1,3], 2: [2,4], 3: [3], 4: [4]},
			bindEvents: function() {
				$('.oos-option.primary').find('select').on('change', function() {
					var primaryValue = parseInt($(this).val()),
						secondaryValue = parseInt(af.oos.$secondaryOptions.filter(':selected').val()),
						allowed = af.oos.allowed[primaryValue];
					af.oos.$secondaryOptions.each(function() {
						$(this).toggleClass('hidden', !allowed || allowed.indexOf(parseInt($(this).val())) < 0);
					});
					if (allowed && allowed.indexOf(secondaryValue) < 0) {
						if (secondaryValue == 4 && primaryValue == 1) {
							updSecondary = 3; // allow oos
						} else if (secondaryValue == 3 && primaryValue == 2) {
							updSecondary = 4 // ignore allowing oos
						} else {
							updSecondary = af.oos.allowed[primaryValue][0];
						}
						af.oos.$secondaryOptions.filter('[value="'+updSecondary+'"]').prop('selected', true).parent().change();
						$(this).addClass('no-autosaving-once');
					}
				}).change();
				$('.oos-option.combinations-stock').find('select').on('change', function() {
					$(this).closest('.settings-item').find('.field-note').toggleClass('hidden', $(this).val() == 0);
				}).change();
			}
		},
		storage: {
			get: function(key) {
				if (typeof localStorage != 'undefined') {
					return localStorage[key];
				}
			},
			save: function(key, value) {
				if (typeof localStorage != 'undefined') {
					localStorage[key] = value;
				}
			}
		},
		clickOutsideIdentifier: 0,
		onClickOutSide: function($el, action) {
			setTimeout(function() {
				let clickEvent = 'click.outside'+(af.clickOutsideIdentifier++);
				$(document).on(clickEvent, function(e) {
					if (!$el.is(e.target) && $el.has(e.target).length === 0) {
						action();
						$(document).off(clickEvent);
					}
				});
			}, 0);
		},
	});
	af.init();

	$(document).on('click', 'a[href="#"], .list-group-item', function(e) {
		e.preventDefault();
	}).on('click', '.saveMultipleSettings', function() {
		var $btn = $(this),
			$forms = $btn.closest('.tab-pane').find('form'),
			params = {action: 'SaveMultipleSettings', submitted_forms: {}},
			response = function(r) {
				if ('errors' in r) {
					af.prependErrors($forms.find('h3').first().next(), utf8_decode(r.errors));
				} else if (r.saved) {
					$.growl.notice({ title: '', message: af_txt.saved});
					if ($btn.hasClass('indexation')) {
						if (!af.instantSettings.active) {
							$btn.closest('.indexation-settings').removeClass('show-settings');
						}
						if ($btn.hasClass('show-reminder')) {
							reindexReminder.appendTo($btn.closest('.tab-pane'));
							$btn.removeClass('show-reminder');
						}

					}
				}
			};
		$forms.each(function() {
			params['submitted_forms'][$(this).data('type')] = $(this).serialize();
			if ($(this).data('type') == 'general') {
				af.merged.toggleMenuItems();
			}
		}).find('.thrown-errors').remove();
		ajaxRequest(params, response);
	}).on('click', '.resetSelectors', function() {
		$(this).closest('form').find('input[type="text"]').each(function() {
			$(this).val($(this).attr('name'));
		}).last().change();
	}).on('click', '.blocked-field', function() {
		alert($(this).data('blocked'));
	});

	$('.menu-panel').find('.list-group-item').on('click', function() {
		$('.menu-panel').find('.list-group-item').removeClass('active');
		$(this).addClass('active');
		$($(this).attr('href')).addClass('active').siblings().removeClass('active');
		af.instantSettings.toggle();
	});

	$('.hookSelector').on('change', function() {
		var hookName = $(this).val(),
			params_string = 'action=UpdateHook&hook_name='+hookName;
		$('.special-hook-note').toggleClass('hidden', hookName != 'displayAmazzingFilter');
		$('#hook-settings').find('.ajax-warning').html('').addClass('hidden');
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&'+params_string,
			dataType : 'json',
			success: function(r) {
				console.dir(r);
				if ('warning' in r) {
					$('#hook-settings').find('.ajax-warning').html(utf8_decode(r.warning)).removeClass('hidden');
				}
				if ('positions_form_html' in r) {
					$('.dynamic-positions').html(utf8_decode(r.positions_form_html));
					$.growl.notice({ title: '', message: af_txt.saved});
				}
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	$('.toggleIndexationSettings').on('click', function() {
		$(this).parent().toggleClass('show-settings');
	});

	$(window).on('load', function() { // after related options have been toggled
		$('.indexation-settings').find('input, select').on('change', function() {
			if ($(this).attr('name') != 'auto') { // no need to reindex products if only this option was updated
				$('.saveMultipleSettings.indexation').addClass('show-reminder');
			}
		});
	})

	$('.indexProducts').on('click', function(){
		if ($(this).hasClass('disabled')) {
			alert('Please wait');
			return;
		}
		$('.indexProducts').addClass('disabled');
		$(this).removeClass('disabled').addClass('btn-success');
		var $parent = $(this).closest('.indexation-buttons');
		$parent.toggleClass('running');
		if (!$parent.hasClass('running')) {
			clearIndexationLayout();
			return;
		}
		$('.shop-indexation-data').addClass('running');
		var all_identifier = $(this).data('all-identifier') || 0;
		runAjaxProductIndexer(all_identifier);
	});

	$('.eraseIndex').on('click', function(){
		if (!confirm(af_txt.areYouSure)) {
			return;
		}
		var $indexationBox = $(this).closest('.shop-indexation-data'),
			id_shop = $indexationBox.data('shop');
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&action=EraseIndex&id_shop='+id_shop,
			dataType : 'json',
			success: function(r){
				// console.dir(r);
				if(r.deleted) {
					$.growl.notice({ title: '', message: af_txt.deleted});
					$indexationBox.removeClass('complete').find('.count.indexed').html('0').siblings('.count.missing').html(r.missing);
					$('.indexation-warning').removeClass('hidden');
					$indexationBox.find('.progress-bar.indexation').css('width', '0%').attr('aria-valuenow', '0').html('');
				} else {
					$.growl.error({ title: '', message: af_txt.error});
				}
			},
			error: function(r){
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	$('.af').on('click', '.editTemplate, .addTemplate', function(e){
		e.preventDefault();
		$('.scrollUp').click();
		var $btn = $(this); id = 0, controller = $(this).data('controller') || 'category';
		if ($(this).hasClass('editTemplate')){
			id = $btn.closest('.af_template').attr('data-id');
			controller = $(this).closest('.af_template').attr('data-controller');
		}
		var params_string = 'action=CallTemplateForm&template_controller='+controller+'&id_template='+id;
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&'+params_string,
			dataType : 'json',
			success: function(r) {
				if (!id) {
					$('.template-list.'+controller).prepend(utf8_decode(r.form_html));
				} else {
					$('.af_template[data-id="'+id+'"]').replaceWith(utf8_decode(r.form_html));
				}
				var $template = $('.af_template[data-id="'+r.id_template+'"]');
				prepareTemplate($template);
				$template.find('.template_settings').slideDown();
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	function prepareTemplate($template) {
		$template.on('click', '.removeFilter', function(){
			$(this).closest('.filter').remove();
		}).on('click', '.toggleFilterSettings', function(){
			$(this).closest('.filter').toggleClass('show-settings').siblings().removeClass('show-settings');
		}).on('change', '.f-type', function(){
			var $excOptions = $(this).closest('.filter').find('.type-exc');
			$excOptions.removeClass('hidden').filter('.not-for-'+$(this).val()).addClass('hidden');
		}).on('click', '.addNewFilter', function(){
			var params = 'action=ShowAvailableFilters',
				response = function(r) {
					$('#dynamic-popup').find('.dynamic-content').html(utf8_decode(r.content));
					$('#dynamic-popup').find('.modal-title').html(utf8_decode(r.title));
				};
			ajaxRequest(params, response);
		}).on('change', '[name="template_controller"]', function(){
			var controller = $(this).val();
			$template.find('.controller-option').addClass('hidden').filter('.'+controller).removeClass('hidden');
		}).tooltip({selector: '.label-tooltip'});

		$template.find('[name="template_controller"]').change();
		$template.find('.controller-settings').find('.basic-item').each(function(){
			updateSelectedOptionsTxt($(this));
			$(this).find('.opt.closed').each(function(){
				markCheckedChildren($(this));
			});
		});

		prepareFilters($template.find('.f-list'));
		activateSortable();
		af.customSorting.init();
	}

	function prepareFilters($filtersList) {
		$filtersList.find('.form-group.custom-name').find('.lang-'+id_language).find('input')
		.off('keyup').on('keyup', function(){
			var $nameHolder = $(this).closest('.filter').find('.name'),
				customName = $.trim($(this).val()) || $nameHolder.data('name');
			$nameHolder.html(customName);
		});
		$filtersList.find('.f-type').change();
		$filtersList.find('.nesting-lvl').off('change').on('change', function(){
			var allowTextBoxes = $(this).val() == '1',
				$tbOption = $(this).closest('.filter').find('.f-type').find('option[value="5"]');
			$tbOption.prop('disabled', !allowTextBoxes);
			if ($tbOption.is(':selected:disabled')) {
				$tbOption.parent().val('1').change(); // select checkbox if textbox is not available
			}
		}).change();
	}

	$(document).on('click', '.addSelectedFilters', function(){
		if ($(this).hasClass('btn-blocked')) {
			return;
		}
		var keys = [];
		$('.filter-group-item.selected').not('.blocked').each(function(){
			keys.push($(this).data('key'));
		});
		var params = 'action=RenderFilterElements&keys='+keys.join(','),
			response = function(r) {
				var $list = $('.af_template.open').first().find('.f-list');
				$list.append(utf8_decode(r.html));
				prepareFilters($list);
				$('#dynamic-popup').find('.close').click();
			};
		ajaxRequest(params, response);
	});

	$('.template-list').on('click', '.lock-toggle', function(e){
		var $parent = $(this).parent(),
			$tab = $(this).closest('.template-tab-content'),
			$counter = $(this).closest('.template_settings').find('.additional-settings-count');
		$parent.toggleClass('locked unlocked');
		$(this).find('input').prop('checked', $parent.hasClass('unlocked'));
		$counter.html($tab.find('.unlocked').length);
	});

	function activateSortable() {
		$('.f-list.sortable').sortable({
			placeholder: 'sortable-filter-placeholder',
		});
	}

	$('.af').on('click', '.template-action', function() {
		if ($(this).hasClass('blocked')) {
			return;
		}
		var action = $(this).data('action'),
			$parent = $(this).closest('.af_template'),
			idTemplate = $parent.data('id');
		if (action == 'Delete' && !confirm(af_txt.areYouSure)) {
			return;
		}
		var params = 'action='+action+'Template&id_template='+idTemplate,
			response = function(r) {
				if ('errors' in r) {
					$parent.before(utf8_decode(r.errors));
				} else if (action == 'Delete' && r.success) {
					$parent.fadeOut(function(){$(this).remove()});
				} else if (action == 'Duplicate' && 'form_html' in r ) {
					$.growl.notice({ title: '', message: af_txt.saved});
					$parent.closest('.template-list').prepend(utf8_decode(r.form_html)).tooltip({selector: '.label-tooltip'});
				}
			};
		$parent.prev('.thrown-errors').remove();
		ajaxRequest(params, response);
	}).on('click', '.toggleExtraActions', function() {
		let $parent = $(this).closest('.template-actions');
		if (!$parent.hasClass('show-extra')) {
			$parent.addClass('show-extra');
			setTimeout(function() {
				$(document).off('click.anywhere').on('click.anywhere', function() {
					$parent.removeClass('show-extra');
					$(document).off('click.anywhere');
				});
			}, 0);
		}
	}).on('click', '.scrollUp', function() {
		scrollUp($(this).closest('.af_template'));
	});

	$('.template-list').on('click', '.template-tab-option', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings('.template-tab-option').removeClass('active');
		$('.template-tab-content'+$(this).attr('href')).addClass('active').siblings('.template-tab-content').removeClass('active');
	}).on('click', '.saveTemplate', function(){
		$('.thrown-errors').remove();
		var $parent = $(this).closest('.af_template'),
			$form = $(this).closest('.template-form');
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&action=SaveTemplate',
			data: $form.serialize(),
			dataType : 'json',
			success: function(r) {
				if ('errors' in r) {
					af.prependErrors($parent, utf8_decode(r.errors));
				} else {
					var callBack = function() {
						var templateName = $('<div>'+$parent.find('input[name="template_name"]').val()+'</div>').text(), // extract only text
							controllerNew =  $parent.find('select[name="template_controller"]').val(),
							controllerPrev = $parent.data('controller');
						$parent.find('.template-name').find('h4').html(templateName);
						if (controllerNew != controllerPrev) {
							moveTemplate($parent, controllerNew);  // may be used in next versions
						}
					};
					scrollUp($parent, callBack);
					$.growl.notice({ title: '', message: af_txt.saved});
				}
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	function scrollUp($template, callBack) {
		callBack = callBack || function(){};
		$template.find('.template_settings').slideUp(function(){
			$template.removeClass('open');
			$(this).html('');
			callBack();
		});
	}

	function moveTemplate($template, controller) { // may be used in next versions
		var $newContainer = $('.template-list.'+controller);
		if ($newContainer.hasClass('hidden')) {
			$template.slideUp(500, function(){
				$template.prependTo($newContainer);
			});
		} else {
			var placeholderHTML = '<div class="template-placeholder"></div>',
				id = $template.data('id');
			$newContainer.find('.af_template').each(function(i){
				if ($(this).data('id') < id) { // templates are sorted by ID DESC
					$(this).before(placeholderHTML);
					placeholderHTML = '';
				}
			});
			if (placeholderHTML) {
				$newContainer.prepend(placeholderHTML);
			}
		}
	}

	$('.af').on('click', '.saveAvailableCustomerFilters', function(){
		var data = $(this).closest('form').serialize();
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&action=SaveAvailableCustomerFilters',
			data: data,
			dataType : 'json',
			success: function(r) {
				console.dir(r);
				if (r.success) {
					$.growl.notice({ title: '', message: af_txt.saved});
				}
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	$(document).on('click', '.activateTemplate', function(e){
		e.preventDefault();
		$('.thrown-errors').remove();
		var id_template = $(this).closest('.af_template').attr('data-id'),
			active = $(this).hasClass('action-enabled') ? 0 : 1,
			$button = $(this);
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&action=ToggleActiveStatus',
			dataType : 'json',
			data: {
				id_template: id_template,
				active: active,
			},
			success: function(r) {
				if ('errors' in r) {
					$button.closest('.af_template').before(utf8_decode(r.errors));
				} else if(r.success) {
					$button.toggleClass('action-enabled action-disabled');
					$button.find('input[name="active"]').val(active)
				}
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	// ----- multiple options
	var parentSelector = '.basic-item', blockUpdateSelectedOptionsTxt = false;
	$('.template-list, .merged-list').on('click', '.selected-options-inline, .hideOptions', function(e){
		var $parent = $(this).closest(parentSelector);
		$parent.find('.available-options').toggleClass('hidden');
		$parent.find('.toggleIndicator').toggleClass('icon-rotate-180');
	}).on('click', '.toggleChildren', function(e){
		e.preventDefault();
		var $opt = $(this).closest('.opt');
		$opt.toggleClass('closed');
		markCheckedChildren($opt);
	}).on('click', '.checkChildren', function(){
		var $checkboxes = $(this).siblings('.opt-level').find('.opt-checkbox'),
			uncheck = $checkboxes.filter(':checked').length;
		$checkboxes.prop('checked', !uncheck).change();
		$('.opt.closed').each(function(){
			markCheckedChildren($(this));
		});
	}).on('change', '.opt-checkbox', function(){
		$(this).closest('label').toggleClass('checked', $(this).prop('checked'));
		updateSelectedOptionsTxt($(this).closest(parentSelector));
	}).on('click', '.opt-action', function(e){
		var $group = $(this).closest(parentSelector),
			action = $(this).data('bulk-action'),
			toggleOtherOption = $(this).data('toggle');
		switch (action) {
			case 'open':
			case 'close':
				var selector = action == 'open' ? '.opt.closed' : '.opt:not(.closed)';
				$group.find(selector).children('.opt-label').children('.toggleChildren').click();
				break;
			case 'check':
			case 'uncheck':
			case 'invert':
				blockUpdateSelectedOptionsTxt = true;
				$group.find('.opt-checkbox').each(function (){
					var checked = action == 'check' ? true : action == 'uncheck' ? false : !$(this).prop('checked');
					$(this).prop('checked', checked).change();
				});
				$('.opt.closed').each(function(){
					markCheckedChildren($(this));
				});
				blockUpdateSelectedOptionsTxt = false;
				updateSelectedOptionsTxt($group);
				break;
		}
		if (toggleOtherOption) {
			$(this).addClass('hidden');
			$(this).siblings('.opt-action[data-bulk-action="'+toggleOtherOption+'"]').removeClass('hidden');
		}
	}).on('change', '.toggleIDs', function(){
		$(this).closest(parentSelector).find('.opt-id').toggleClass('hidden', !$(this).prop('checked'));
	});

	function updateSelectedOptionsTxt($group) {
		if (blockUpdateSelectedOptionsTxt) {
			return;
		}
		var $checked = $group.find('.opt-checkbox:checked'), total = $checked.length, displayedNum = 7, extra = '';
		if ($group.find('.dynamic-name').length) {
			selectedTxt = [];
			$checked.each(function(){
				if (selectedTxt.length < displayedNum) {
					selectedTxt.push($(this).closest('.opt-label').find('.opt-name').text());
				} else {
					extra = ', ... + '+(total - displayedNum);
					return false;
				}
			});
			selectedTxt = selectedTxt.join(', ')+extra;
			$group.find('.item-names').html(selectedTxt);
			$group.find('.total-num').html(total);
		}
		$group.toggleClass('has-selection', !!total);
	}

	function markCheckedChildren($opt) {
		var childrenChecked = $opt.find('.opt-level').find('.opt-checkbox:checked').length,
			showNum = childrenChecked && $opt.hasClass('closed');
		$opt.children('.checked-num').toggleClass('hidden', !showNum).find('.dynamic-num').html(childrenChecked);
	}
	// ----- /multiple options

	$('.toggle-cron').on('click', function(){
		$(this).closest('.shop-indexation-data').toggleClass('show-cron')
		.closest('.grid-item').siblings().find('.shop-indexation-data').removeClass('show-cron');
	});

	$('.close-cron').on('click', function(){
		$(this).closest('.shop-indexation-data').removeClass('show-cron');
	});

	$('.install-override, .uninstall-override').on('click', function(){
		var $parent = $(this).closest('.override-item'),
			action = $(this).hasClass('install-override') ? 'addOverride' : 'removeOverride',
			override = $(this).data('override');
		$parent.find('.thrown-errors').remove();
		$.ajax({
			type: 'POST',
			url: ajax_action_path+'&action='+action+'&override='+override,
			dataType : 'json',
			success: function(r) {
				// console.dir(r);
				if ('errors' in r) {
					$parent.prepend(utf8_decode(r.errors));
				} else if (r.processed) {
					$.growl.notice({ title: '', message: af_txt.saved});
					$parent.toggleClass('installed not-installed');
				} else {
					$.growl.error({ title: '', message: af_txt.error});
				}
			},
			error: function(r) {
				console.warn($(r.responseText).text() || r.responseText);
			}
		});
	});

	function runAjaxProductIndexer(all_identifier) {
		$('.indexation-buttons').find('.thrown-errors').remove();
		var	params = '&action=RunProductIndexer&all_identifier='+all_identifier,
			successResponse = function (r) {
				if ('errors' in r) {
					$('.indexation-buttons').prepend(utf8_decode(r.errors));
					clearIndexationLayout();
				} else if ('indexation_data' in r) {
					$.each(r.indexation_data, function(id_shop, data) {
						var $indexationBox = $('.shop-indexation-data[data-shop="'+id_shop+'"]');
						$indexationBox.find('.count.indexed').html(data['indexed']).siblings('.count.missing').html(data['missing']);
						if ('indexation_process_data' in r && id_shop in r.indexation_process_data) {
							data = r.indexation_process_data[id_shop];
						}
						var total = data['missing'] + data['indexed'], w = Math.round(100 - (data['missing']/total) * 100);
						$indexationBox.toggleClass('complete', !data['missing']).find('.progress-bar.indexation')
						.css('width', w+'%').attr('aria-valuenow', w).html(data['indexed']+'/'+total);
					});
					if ($('.indexation-buttons').hasClass('running') && $('.shop-indexation-data').not('.complete').length) {
						runAjaxProductIndexer(all_identifier);
					} else {
						$('.indexation-warning').addClass('hidden');
						reindexReminder.removeAll();
						clearIndexationLayout();
					}
				}
			},
			errorResponse = function(r) {
				clearIndexationLayout();
			};
		ajaxRequest(params, successResponse, errorResponse);
	}

	function clearIndexationLayout() {
		$('#indexation').find('.running').removeClass('running');
		$('.progress-bar.indexation').css('width', '0').attr('aria-valuenow', '0').html('');
		$('.indexProducts').removeClass('btn-success').removeClass('disabled');
	}

	// merged params
	$('.mergedGroup').on('change', function(){
		var $parent = $(this).closest('.merged-params'),
			params = {mergedValues: 1, action: 'getItems', type: $parent.data('type'), id_group: $(this).val()},
			response = function(r) {
				if ('html' in r) {
					$parent.find('.merged-list').html(utf8_decode(r.html)).find('.basic-item').each(function(){
						updateSelectedOptionsTxt($(this));
					});
				}
			};
		ajaxRequest(params, response);
	}).change();
	$('.addMergedRow').on('click', function(){
		var $parent = $(this).closest('.merged-params'),
			params = {
				mergedValues: 1,
				action: 'addRow',
				type: $parent.data('type'),
				id_group: $parent.find('.mergedGroup').val(),
				position: af.merged.getNewPosition($parent),
			},
			response = function(r) {
				if ('html' in r) {
					$parent.find('.merged-list').append(utf8_decode(r.html));
					$parent.find('.no-matches').remove();
				}
			};
		ajaxRequest(params, response);
	});
	$('.merged-list').on('click', '.deleteMergedRow', function(){
		if (!confirm(af_txt.areYouSure)) {
			return;
		}
		var $row = $(this).closest('.merged-row'),
			params = {
				mergedValues: 1,
				action: 'deleteRow',
				type: $(this).closest('.merged-params').data('type'),
				id_merged:$row.data('id')
			},
			response = function(r) {
				if (r.deleted) {
					if (!$row.siblings('.merged-row').length) {
						$row.closest('.merged-params').find('.mergedGroup').change(); // display .no-matches
					} else {
						$row.remove();
					}
					$.growl.notice({ title: '', message: af_txt.deleted});
				}
			};
		ajaxRequest(params, response);
	}).on('click', '.saveMergedRow', function(){
		var $row = $(this).closest('.merged-row'),
			params = {mergedValues: 1, action: 'saveRow', data: $(this).closest('form').serialize()},
			response = function(r) {
				if (r.saved_id) {
					$row.data('id', r.saved_id).attr('data-id', r.saved_id).find('input[name="id_merged"]').val(r.saved_id);
					$row.find('.available-options').addClass('hidden');
					$.growl.notice({ title: '', message: af_txt.saved});
					reindexReminder.appendTo($row.closest('.tab-pane'));
				}
			};
		ajaxRequest(params, response);
	});

	var reindexReminder = {
		init: function() {
			$('.tab-pane').on('click', '.close-reminder', function() {
				$(this).closest('.reindex-reminder').remove();
			});
		},
		appendTo: function($parent) {
			var $r = $parent.find('.reindex-reminder');
			if ($r.length) {
				$r.removeClass('flashing'); setTimeout(function(){$r.addClass('flashing');}, 50);
			} else {
				$('.reindex-reminder.orig').clone().removeClass('orig hidden').appendTo($parent).addClass('flashing');
			}
		},
		removeAll: function() {
			$('.reindex-reminder').not('.orig').remove();
		}
	};
	reindexReminder.init();

	// caching
	var cachingSettings = {
		updateInfo: function() {
			var params = {action: 'getCachingInfo'},
				response = function(r) {
					$.each(r.info, function(name, text) {
						var $note = $('.form-group.'+name).find('.field-note');
						if (!$note.length) {
							$note = $('<span class="field-note"></span>').appendTo('.form-group.'+name);
						}
						$note.html(utf8_decode(text));
					});
				};
			ajaxRequest(params, response);
		},
		toggleCombData: function() {
			var hide = $('.switch-select[name="combinations_stock"]').val() < 1 &&
				$('.switch-select[name="p_comb"]').val() < 1;
			$('#caching-settings').find('.form-group.comb_data').toggleClass('hidden', hide);
		},
		clear: function() {
			ajaxRequest({action: 'clearCache'}, cachingSettings.updateInfo);
		},
		init: function() {
			cachingSettings.toggleCombData();
			cachingSettings.updateInfo();
			$('.clearCache').on('click', function(){cachingSettings.clear();});
			$('.toggle-combinations-cache').on('change', function() {
				cachingSettings.toggleCombData();
			});
			if ($('#caching-settings').find('option[value="1"]:selected').length) {
				setInterval(function(){cachingSettings.updateInfo();}, 60000);
			}
		},
	};
	cachingSettings.init();

	//sort templates
	var templateSorting = {
		default: {by: 'date_add', way: 'desc'}, // date_add represents sorting by ID
		getParamName: function(controllerType) {
			return 'sort_'+controllerType+'_templates';
		},
		init: function() {
			$('.ts-current-option').on('click', function() {
				$(this).parent().toggleClass('show-options');
			});
			$('.ts-way').on('click', function() {
				$(this).children().toggleClass('hidden current');
				templateSorting.apply($(this));
			});
			$('.ts-by').on('click', function() {
				var txt = $(this).text();
				$(this).siblings().removeClass('current');
				$(this).addClass('current').closest('.template-sorting').removeClass('show-options').
				find('.ts-current-option').text(txt);
				templateSorting.apply($(this));
			});
			templateSorting.applyFromURL();
		},
		apply: function($el) {
			var $group = $el.closest('.template-group'),
				$templates = $group.find('.af_template'),
				order = {
					by: $group.find('.ts-by.current').data('by'),
					way: $group.find('.ts-way').find('.current').data('way'),
				},
				asc = order.way == 'asc';
			if (order.by == 'name') {
				$templates.sort(function(a, b) {
					var a = $(a).find('input[name="template_name"]').val().toUpperCase(),
						b = $(b).find('input[name="template_name"]').val().toUpperCase();
					return asc ? a.localeCompare(b) : b.localeCompare(a);
				});
			} else {
				$templates.sort(function(a, b) {
					return asc ? $(a).data('id') - $(b).data('id') : $(b).data('id') - $(a).data('id');
				});
			}
			$group.find('.template-list').prepend($templates);
			templateSorting.updateURL($group.find('.addTemplate').data('controller'), order);
		},
		updateURL: function(controllerType, order) {
			if (window.location.search) {
				var sortingParam = templateSorting.getParamName(controllerType),
					params = JSON.parse('{"'+decodeURI(window.location.search)
					.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')+'"}');
				delete params[sortingParam];
				if (order.way != templateSorting.default.way || order.by != templateSorting.default.by) {
					params[sortingParam] = order.by+':'+order.way;
				}
				var newURL = window.location.href.split('?')[0]+decodeURIComponent($.param(params, true));
				if (newURL != window.location.href) {
					window.history.pushState(null, null, newURL);
				}
			}
		},
		applyFromURL: function() {
			$('.template-sorting').each(function() {
				var $group = $(this).closest('.template-group'),
					controllerType = $group.find('.addTemplate').data('controller'),
					forcedSorting = getUrlParam(templateSorting.getParamName(controllerType)).split(':');
				if (forcedSorting.length == 2) {
					$(this).find('.ts-way').find('[data-way="'+forcedSorting[1]+'"]')
					.addClass('current').removeClass('hidden').siblings().addClass('hidden').removeClass('current');
					$(this).find('.ts-by[data-by="'+forcedSorting[0]+'"]').click();
				}
				$group.removeClass('not-ready');
			});
		},
	};
	templateSorting.init();

	var forcedTab = getUrlParam('tab');
	if (forcedTab) {
		$('.list-group-item[href="#'+forcedTab).click();
	}

	function getUrlParam(name) {
		return (location.search.split(name+'=')[1] || '').split('&')[0];
	}
});

function ajaxRequest(params, response, errorResponse){
	errorResponse = typeof errorResponse == 'undefined' ? function(r){} : errorResponse;
	$.ajax({
		type: 'POST',
		url: ajax_action_path,
		data: params,
		dataType : 'json',
		success: function(r) {
			console.dir(r);
			response(r);
			if ('notice' in r) {
				$.growl.notice({ title: '', message: utf8_decode(r.notice)});
			}
		},
		error: function(r) {
			console.warn($(r.responseText).text() || r.responseText);
			errorResponse(r);
		}
	});
}

function utf8_decode(utfstr) {
	var res = '';
	for (var i = 0; i < utfstr.length;) {
		var c = utfstr.charCodeAt(i);
		if (c < 128) {
			res += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			var c1 = utfstr.charCodeAt(i+1);
			res += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
			i += 2;
		} else {
			var c1 = utfstr.charCodeAt(i+1);
			var c2 = utfstr.charCodeAt(i+2);
			res += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
			i += 3;
		}
	}
	return res;
}
/* since 3.1.9 */
