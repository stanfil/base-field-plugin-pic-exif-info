"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const tools_1 = require("./tools");
const { t } = block_basekit_server_api_1.field;
block_basekit_server_api_1.basekit.addDomainList(["internal-api-drive-stream.feishu.cn"]);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            }
        },
    ],
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'name',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('name'),
                },
                {
                    key: 'resolution',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('resolution'),
                    primary: true,
                },
                {
                    key: 'size',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('size'),
                },
                {
                    key: 'modifiedDate',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('modifiedDate'),
                },
            ],
        },
    },
    execute: async (formItemParams, context) => {
        const { attachments = [] } = formItemParams;
        try {
            const metadata = await (0, tools_1.extractExifData)(attachments, context.fetch);
            // console.log(1111, JSON.stringify(metadata))
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    id: `${Math.random()}`,
                    resolution: metadata.resolution || '',
                    size: metadata.fileSize || '',
                    modifiedDate: metadata.modifyDate || '',
                    name: metadata.name || '',
                    // name: metadata.name,
                }
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNkg7QUFDN0gsbUNBQTBDO0FBVzFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBRXBCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFBO0FBRTlELGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxnQkFBZ0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixNQUFNLEVBQUUsSUFBSTtnQkFDWixjQUFjLEVBQUUsTUFBTTtnQkFDdEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsK0NBQStDO2dCQUM5RCxZQUFZLEVBQUUsWUFBWTtnQkFDMUIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsY0FBYyxFQUFFLGVBQWU7Z0JBQy9CLE1BQU0sRUFBRSxZQUFZO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSx5QkFBeUI7Z0JBQ3hDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixNQUFNLEVBQUUsS0FBSztnQkFDYixjQUFjLEVBQUUsTUFBTTtnQkFDdEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtTQUNGO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEtBQUssRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3ZCLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLFdBQVc7WUFDckMsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3BDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRjtLQUNGO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLG9DQUFTLENBQUMsTUFBTTtRQUN0QixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLDZFQUE2RTthQUNyRjtZQUNELFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxHQUFHLEVBQUUsSUFBSTtvQkFDVCxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLE1BQU07b0JBQ1gsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ2pCO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxZQUFZO29CQUNqQixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztvQkFDdEIsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLE1BQU07b0JBQ1gsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ2pCO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxjQUFjO29CQUNuQixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztpQkFDekI7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLGNBQStDLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDMUUsTUFBTSxFQUFFLFdBQVcsR0FBRyxFQUFFLEVBQUUsR0FBRyxjQUFjLENBQUM7UUFFNUMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLHVCQUFlLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRSw4Q0FBOEM7WUFFOUMsT0FBTztnQkFDTCxJQUFJLEVBQUUsb0NBQVMsQ0FBQyxPQUFPO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN0QixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxFQUFFO29CQUNyQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFO29CQUM3QixZQUFZLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxFQUFFO29CQUN2QyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUN6Qix1QkFBdUI7aUJBQ3hCO2FBQ0YsQ0FBQTtRQUNILENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTztnQkFDTCxJQUFJLEVBQUUsb0NBQVMsQ0FBQyxLQUFLO2FBQ3RCLENBQUE7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILGtCQUFlLGtDQUFPLENBQUMifQ==