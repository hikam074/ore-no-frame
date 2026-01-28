import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    linkDialogPlugin,
    quotePlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink
} from '@mdxeditor/editor'

export function MarkdownEditor() {
    return (
        <MDXEditor
            markdown=""
            plugins={[
                headingsPlugin({
                    allowedHeadingLevels: [3, 4, 5, 6],
                }),
                listsPlugin(),
                quotePlugin(),
                linkPlugin({
                    validateUrl: (url) => url.startsWith('http'),
                }),
                linkDialogPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <ListsToggle />
                            <CreateLink />
                        </>
                    ),
                }),
            ]}
            className=' bg-white rounded-lg border border-border 
                        prose prose-neutral
                        prose-li:my-0 prose-ol:my-0
                        prose-h3:mt-2 prose-h3:mb-0 prose-h3:border-b prose-h3:border-border
                        prose-h3:text-lg 
                        max-w-none leading-tight
                    '
        />
    )
}