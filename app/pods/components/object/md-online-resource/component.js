import classic from 'ember-classic-decorator';
import { attributeBindings, classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { getOwner } from '@ember/application';
import EmObject, { get, set, action } from '@ember/object';
import { once } from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { UploadFile } from 'ember-file-upload';

const regex = new RegExp("([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?");

const Validations = buildValidations({
  'uri': [
    validator('format', {
      regex: regex,
      isWarning: true,
      message: 'This field should be a valid, resolvable uri.'
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

@classic
@classNames('md-online-resource')
@attributeBindings('data-spy')
class theComp extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, ()=>{
        let plain = this.model;

        if (plain && !get(plain,'validations')) {
          @classic
          class Model extends EmObject.extend(Validations, plain) {}

          const owner = getOwner(this);

          let model = Model.create(owner.ownerInjection(), plain);
          this.set('model', model);
        }
    });
  }

  @service
  flashMessages;

  @action
  triggerFileInput() {
    document.getElementById('image-file-input')?.click();
  }

  @action
  handleFileInput(queue, event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadFile = new UploadFile(file);
        queue.add(uploadFile);
      }
      // Reset the input
      event.target.value = '';
    }
  }

  @action
  handleFile(file) {
    const fileSize = file.size || file.blob?.size;
    const fileName = file.name || file.blob?.name;
    
    if (fileSize > 50000) {
      this.flashMessages
        .danger(
          `The image exceeded the maximum size of 50KB: ${fileSize} bytes.
          Please use an online URL to load the image.`
        );
    } else {
      let model = this.model;

      // Read file as data URL for images
      if (file.readAsDataURL) {
        file.readAsDataURL().then(result => {
          set(model, 'name', fileName);
          set(model, 'uri', result);
        });
      } else {
        // Fallback for manual file reading
        const reader = new FileReader();
        reader.onload = (e) => {
          set(model, 'name', fileName);
          set(model, 'uri', e.target.result);
        };
        reader.readAsDataURL(file.blob || file);
      }

      if (fileSize > 25000) {
        this.flashMessages
          .warning(
            `The image exceeded the recommended size of 25KB: ${fileSize} bytes`
          );
      }
    }
  }
}

export {
  Validations,
  regex,
  theComp as
  default
};
