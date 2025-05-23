"""empty message

Revision ID: 413498beef41
Revises: 76e8e4f14c98
Create Date: 2024-08-11 21:16:54.584495

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '413498beef41'
down_revision = '76e8e4f14c98'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('team',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('team_member',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['team_id'], ['team.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('reporting')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reporting',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('project_id', sa.INTEGER(), nullable=True),
    sa.Column('task_id', sa.INTEGER(), nullable=True),
    sa.Column('task_amount', sa.INTEGER(), nullable=False),
    sa.Column('ongoing_projects', sa.INTEGER(), nullable=True),
    sa.Column('completed_tasks', sa.INTEGER(), nullable=True),
    sa.Column('ongoing_tasks', sa.INTEGER(), nullable=True),
    sa.Column('task_by_user', sa.INTEGER(), nullable=True),
    sa.Column('deadline', sa.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('team_member')
    op.drop_table('team')
    # ### end Alembic commands ###
