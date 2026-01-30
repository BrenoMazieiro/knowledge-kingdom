import { useState } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Badge } from '@/components/atoms/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Separator } from '@/components/atoms/separator';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { PageHeader } from '@/components/molecules/PageHeader';
import { OverviewSkeleton } from '@/components/molecules/OverviewSkeleton';
import { ContentsTable } from '@/components/organisms/house/ContentsTable';
import { CreateContentDialog } from '@/components/organisms/house/CreateContentDialog';
import { EditContentDialog } from '@/components/organisms/house/EditContentDialog';
import { QuestionsTable } from '@/components/organisms/house/QuestionsTable';
import { CreateQuestionDialog } from '@/components/organisms/house/CreateQuestionDialog';
import { EditQuestionDialog } from '@/components/organisms/house/EditQuestionDialog';
import type { Question } from '@/components/organisms/house/QuestionsTable';

const HOUSE_QUERY = gql`
  query House($id: ID!) {
    house(id: $id) {
      id version name description isFree entryPrice
      village { id name kingdom { id name } }
      contents { id version title type url body description sortOrder createdAt }
    }
  }
`;

const QUESTIONS_QUERY = gql`
  query Questions($houseId: ID!) {
    questions(houseId: $houseId) {
      id version text difficulty explanation sortOrder createdAt
      options { id text isCorrect sortOrder }
    }
  }
`;

const QUESTION_POOL_QUERY = gql`
  query QuestionPool($houseId: ID!) {
    questionPool(houseId: $houseId) {
      houseId
      counts { EASY MEDIUM HARD }
      total
    }
  }
`;

const CREATE_CONTENT_MUTATION = gql`
  mutation CreateContent($input: CreateContentInput!) {
    createContent(input: $input) { id }
  }
`;

const UPDATE_CONTENT_MUTATION = gql`
  mutation UpdateContent($input: UpdateContentInput!) {
    updateContent(input: $input) { id }
  }
`;

const DELETE_CONTENT_MUTATION = gql`
  mutation DeleteContent($id: ID!, $version: Int!) {
    deleteContent(id: $id, version: $version)
  }
`;

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) { id }
  }
`;

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) { id }
  }
`;

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestion($id: ID!, $version: Int!) {
    deleteQuestion(id: $id, version: $version)
  }
`;

type Content = { id: string; version: number; title: string; type: string; url: string | null; body: string | null; description: string | null; sortOrder: number; createdAt: string };
type HouseData = {
  house: {
    id: string; version: number; name: string; description: string | null; isFree: boolean; entryPrice: number | null;
    village: { id: string; name: string; kingdom: { id: string; name: string } };
    contents: Content[];
  };
};

type QuestionPoolData = {
  questionPool: {
    houseId: string;
    counts: { EASY: number; MEDIUM: number; HARD: number };
    total: number;
  };
};

export const HouseDetailPage = () => {
  const { kingdomId, villageId, houseId } = useParams();
  const [contentOpen, setContentOpen] = useState(false);
  const [editContent, setEditContent] = useState<Content | null>(null);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const { data, loading } = useQuery<HouseData>(HOUSE_QUERY, { variables: { id: houseId } });
  const { data: questionsData } = useQuery<{ questions: Question[] }>(QUESTIONS_QUERY, { variables: { houseId } });
  const { data: poolData } = useQuery<QuestionPoolData>(QUESTION_POOL_QUERY, { variables: { houseId } });

  const [createContent, { loading: creatingContent }] = useMutation(CREATE_CONTENT_MUTATION, { refetchQueries: ['House'] });
  const [updateContent, { loading: updatingContent }] = useMutation(UPDATE_CONTENT_MUTATION, { refetchQueries: ['House'] });
  const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION, { refetchQueries: ['House'] });
  const [createQuestion, { loading: creatingQuestion }] = useMutation(CREATE_QUESTION_MUTATION, { refetchQueries: ['Questions', 'QuestionPool'] });
  const [updateQuestion, { loading: updatingQuestion }] = useMutation(UPDATE_QUESTION_MUTATION, { refetchQueries: ['Questions', 'QuestionPool'] });
  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, { refetchQueries: ['Questions', 'QuestionPool'] });

  const handleCreateContent = async (input: { title: string; type: string; url?: string; body?: string; description?: string }) => {
    await createContent({ variables: { input: { houseId, ...input } } });
    setContentOpen(false);
  };

  const handleUpdateContent = async (input: { id: string; version: number; title?: string; type?: string; url?: string; body?: string; description?: string }) => {
    await updateContent({ variables: { input } });
    setEditContent(null);
  };

  const handleDeleteContent = async (content: Content) => {
    await deleteContent({ variables: { id: content.id, version: content.version } });
  };

  const handleCreateQuestion = async (input: { text: string; difficulty: string; explanation?: string; options: { text: string; isCorrect: boolean }[] }) => {
    await createQuestion({ variables: { input: { houseId, ...input } } });
    setQuestionOpen(false);
  };

  const handleUpdateQuestion = async (input: { id: string; version: number; text: string; difficulty: string; explanation?: string; options: { text: string; isCorrect: boolean }[] }) => {
    await updateQuestion({ variables: { input } });
    setEditQuestion(null);
  };

  const handleDeleteQuestion = async (question: Question) => {
    await deleteQuestion({ variables: { id: question.id, version: question.version } });
  };

  if (loading) {
    return <OverviewSkeleton statCards={0} />;
  }

  const house = data?.house;
  const pool = poolData?.questionPool;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Kingdoms', href: '/kingdoms' },
        { label: house?.village.kingdom.name ?? '', href: `/kingdoms/${kingdomId}` },
        { label: house?.village.name ?? '', href: `/kingdoms/${kingdomId}/villages/${villageId}` },
        { label: house?.name ?? '' },
      ]} />
      <PageHeader
        title={house?.name ?? ''}
        description={house?.description ?? undefined}
      />
      <div className="flex items-center gap-2">
        <Badge variant={house?.isFree ? 'secondary' : 'default'}>
          {house?.isFree ? 'Free' : `${house?.entryPrice} Quills`}
        </Badge>
      </div>
      <Separator />
      <ContentsTable
        contents={house?.contents ?? []}
        onCreateClick={() => setContentOpen(true)}
        onEditClick={setEditContent}
        onDeleteClick={handleDeleteContent}
      />
      {pool && (
        <Card>
          <CardHeader>
            <CardTitle>Question Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Easy: {pool.counts.EASY}</Badge>
              <Badge variant="default">Medium: {pool.counts.MEDIUM}</Badge>
              <Badge variant="destructive">Hard: {pool.counts.HARD}</Badge>
              <span className="text-sm text-muted-foreground">Total: {pool.total}</span>
            </div>
          </CardContent>
        </Card>
      )}
      <QuestionsTable
        questions={questionsData?.questions ?? []}
        onCreateClick={() => setQuestionOpen(true)}
        onEditClick={setEditQuestion}
        onDeleteClick={handleDeleteQuestion}
      />
      <CreateContentDialog open={contentOpen} onOpenChange={setContentOpen} onSubmit={handleCreateContent} loading={creatingContent} />
      <EditContentDialog
        open={editContent !== null}
        onOpenChange={(open) => { if (!open) setEditContent(null); }}
        content={editContent}
        onSubmit={handleUpdateContent}
        loading={updatingContent}
      />
      <CreateQuestionDialog open={questionOpen} onOpenChange={setQuestionOpen} onSubmit={handleCreateQuestion} loading={creatingQuestion} />
      <EditQuestionDialog
        open={editQuestion !== null}
        onOpenChange={(open) => { if (!open) setEditQuestion(null); }}
        question={editQuestion}
        onSubmit={handleUpdateQuestion}
        loading={updatingQuestion}
      />
    </div>
  );
};
