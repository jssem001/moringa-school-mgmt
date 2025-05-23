"""Add user model and relationships

Revision ID: 76e8e4f14c98
Revises: 783937e786d8
Create Date: 2024-08-05 11:34:15.881422

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76e8e4f14c98'
down_revision = '783937e786d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('role')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.VARCHAR(length=100), nullable=False))

    # ### end Alembic commands ###
