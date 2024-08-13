"""merging two heads

Revision ID: 1e8b6e93dfc2
Revises: 049485a13e11, 3efe6f9e9152, 78aeaa396730, 8135e3cd21b6
Create Date: 2024-08-11 15:19:26.931372

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e8b6e93dfc2'
down_revision = ('049485a13e11', '3efe6f9e9152', '78aeaa396730', '8135e3cd21b6')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
