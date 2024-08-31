import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter } from '@lark-opdev/block-basekit-server-api';
import { extractExifData } from './tools';

type TAttachment = {
  "tmp_url": string;
  "name": string;
  "type": string;
  "size": number;
  "token": string;
  "timeStamp": number;
}

const { t } = field;

basekit.addDomainList(["internal-api-drive-stream.feishu.cn"])

basekit.addField({
  i18n: {
    messages: {
      "zh-CN": {
        "attachments": "选择图片字段（默认取第一张）",
        "resolution": "分辨率",
        "size": "大小",
        "modifiedDate": "修改日期",
        "name": "图片名"
      },
      "en-US": {
        "attachments": "Select Image Field (default to the first one)",
        "resolution": "Resolution",
        "size": "Size",
        "modifiedDate": "Modified Date",
        "name": "Image Name"
      },
      "ja-JP": {
        "attachments": "画像フィールドを選択（デフォルトで最初の画像）",
        "resolution": "解像度",
        "size": "サイズ",
        "modifiedDate": "変更日時",
        "name": "画像名"
      }
    }
  },
  formItems: [
    {
      key: 'attachments',
      label: t('attachments'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      },
      validator: {
        required: true,
      }
    },
  ],
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'name',
          type: FieldType.Text,
          title: t('name'),
        },
        {
          key: 'resolution',
          type: FieldType.Text,
          title: t('resolution'),
          primary: true,
        },
        {
          key: 'size',
          type: FieldType.Text,
          title: t('size'),
        },
        {
          key: 'modifiedDate',
          type: FieldType.Text,
          title: t('modifiedDate'),
        },
      ],
    },
  },
  execute: async (formItemParams: { attachments?: TAttachment[] }, context) => {
    const { attachments = [] } = formItemParams;

    try {
      const metadata = await extractExifData(attachments, context.fetch);
      
      // console.log(1111, JSON.stringify(metadata))
      
      return {
        code: FieldCode.Success,
        data: {
          id: `${Math.random()}`,
          resolution: metadata.resolution || '',
          size: metadata.fileSize || '',
          modifiedDate: metadata.modifyDate || '',
          name: metadata.name || '',
          // name: metadata.name,
        }
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});

export default basekit;