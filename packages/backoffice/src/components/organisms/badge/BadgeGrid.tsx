import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

type PlayerBadge = {
  id: string;
  playerId: string;
  badgeType: string;
  scopeType: string;
  scopeId: string | null;
  quillsEarned: number;
  earnedAt: string;
};

type BadgeGridProps = {
  badges: PlayerBadge[];
};

const SCOPE_ORDER = ['VILLAGE', 'KINGDOM', 'WORLD'];

const scopeVariant = (scope: string) => {
  switch (scope) {
    case 'VILLAGE': return 'secondary' as const;
    case 'KINGDOM': return 'default' as const;
    case 'WORLD': return 'destructive' as const;
    default: return 'outline' as const;
  }
};

export const BadgeGrid = ({ badges }: BadgeGridProps) => {
  const grouped = SCOPE_ORDER.reduce<Record<string, PlayerBadge[]>>((acc, scope) => {
    const filtered = badges.filter((b) => b.scopeType === scope);
    if (filtered.length > 0) {
      acc[scope] = filtered;
    }
    return acc;
  }, {});

  if (badges.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No badges earned yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {Object.entries(grouped).map(([scope, scopeBadges]) => (
        <div key={scope} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{scope} Badges</h2>
            <Badge variant={scopeVariant(scope)}>{scopeBadges.length}</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {scopeBadges.map((badge) => (
              <Card key={badge.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{badge.badgeType}</CardTitle>
                    <Badge variant={scopeVariant(badge.scopeType)}>{badge.scopeType}</Badge>
                  </div>
                  <CardDescription>
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quills Earned</span>
                    <span className="font-medium">{badge.quillsEarned}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
