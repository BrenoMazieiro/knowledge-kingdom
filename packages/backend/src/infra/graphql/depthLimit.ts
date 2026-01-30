import {
  type ValidationContext,
  type ASTVisitor,
  type FieldNode,
  type FragmentSpreadNode,
  type InlineFragmentNode,
  type SelectionSetNode,
  Kind,
  GraphQLError,
} from 'graphql';

const measureDepth = (
  selectionSet: SelectionSetNode | undefined,
  fragments: Record<string, SelectionSetNode>,
  depth: number,
): number => {
  if (!selectionSet) return depth;

  let maxDepth = depth;
  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD) {
      const fieldNode = selection as FieldNode;
      const fieldDepth = measureDepth(fieldNode.selectionSet, fragments, depth + 1);
      if (fieldDepth > maxDepth) maxDepth = fieldDepth;
    } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const spreadNode = selection as FragmentSpreadNode;
      const fragmentSet = fragments[spreadNode.name.value];
      if (fragmentSet) {
        const fragmentDepth = measureDepth(fragmentSet, fragments, depth);
        if (fragmentDepth > maxDepth) maxDepth = fragmentDepth;
      }
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      const inlineNode = selection as InlineFragmentNode;
      const inlineDepth = measureDepth(inlineNode.selectionSet, fragments, depth);
      if (inlineDepth > maxDepth) maxDepth = inlineDepth;
    }
  }
  return maxDepth;
};

export const depthLimitRule = (maxDepth: number) => {
  return (context: ValidationContext): ASTVisitor => ({
    Document: {
      enter(node) {
        const fragments: Record<string, SelectionSetNode> = {};
        for (const definition of node.definitions) {
          if (definition.kind === Kind.FRAGMENT_DEFINITION && definition.selectionSet) {
            fragments[definition.name.value] = definition.selectionSet;
          }
        }

        for (const definition of node.definitions) {
          if (definition.kind === Kind.OPERATION_DEFINITION && definition.selectionSet) {
            const depth = measureDepth(definition.selectionSet, fragments, 0);
            if (depth > maxDepth) {
              context.reportError(
                new GraphQLError(
                  `Query depth of ${depth} exceeds the maximum allowed depth of ${maxDepth}`,
                ),
              );
            }
          }
        }
      },
    },
  });
};
