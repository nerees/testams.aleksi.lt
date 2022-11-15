<form class="defaultForm form-horizontal" method="post">
	<div class="panel">
		<div class="panel-heading">
			<i class="icon-cogs"></i> {l s='Settings' mod='ga4'}
		</div>
		{$values['GA4_ENABLED']|var_dump}
		<div class="form-wrapper">
			<div class="form-group">
				<label class="control-label col-lg-3">{l s='TAG ID' mod='ga4'}</label>
				<div class="col-lg-6">
					<input type="text" name="IC_GA4_ID" value="{$values['GA4_ID']}" class="form-control" placeholder="G-XXXXXXXXXX">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-lg-3">{l s='Add Google Tag to pages:' mod='ga4'}</label>

				<div class="col-lg-6">
						<span class="switch prestashop-switch fixed-width-lg">
							<input type="radio"
								   name="IC_GA4_ENABLED"
								   id="IC_GA4_ENABLED_on"
								   value="1"
								   {if $values['GA4_ENABLED']}checked="checked"{/if}>
							<label for="IC_GA4_ENABLED">{l s='Yes' mod='ga4'}</label>
							<input type="radio"
								   name="IC_GA4_ENABLED"
								   id="IC_GA4_ENABLED_off"
								   value="0"
								   {if !$values['GA4_ENABLED']}checked="checked"{/if}>
							<label for="IC_GA4_ENABLED">{l s='No' mod='ga4'}</label>
							<a class="slide-button btn"></a>
						</span>
					<span class="help-block">{l s='Adds GA4 GTAG to header:' mod='ga4'}</span>
				</div>
			</div>
		</div>

		<div class="panel-footer">
			<button type="submit" value="1" id="module_form_submit_btn" name="submitSave" class="btn btn-default pull-right">
				<i class="process-icon-save"></i> {l s='Save' mod='ga4'}
			</button>
		</div>
	</div>
</form>